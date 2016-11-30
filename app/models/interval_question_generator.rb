require 'midilib/sequence'
require 'midilib/consts'
require 'stringio'
require 'base64'
include MIDI

class IntervalQuestionGenerator < QuestionGenerator
  def make_question(user)
    range, num_choices, interval,
    other_intervals, prompt, same_start = parameters.values_at("range", "num_choices", "interval", "other_intervals", "prompt", "same_start")

    question = MultipleChoiceQuestion.create(prompt: prompt, question_generator: self)

    # figure out intervals
    intervals = [interval]
    (2..num_choices).each do |_i|
      intervals.push(other_intervals.sample)
    end
    lowest_starting_note = note2num(range[0])
    lowest_starting_note -= intervals.min if intervals.min < 0

    highest_starting_note = note2num(range[1])
    highest_starting_note -= intervals.max if intervals.max > 0

    starting_note = rand(lowest_starting_note..highest_starting_note) if same_start

    alph = ('A'..'Z').to_a
    intervals.shuffle.each_with_index do |i, index|
      blob = ''
      if same_start
        blob = generate_midi([starting_note, starting_note + i])
      else
        start = rand(lowest_starting_note..highest_starting_note)
        blob = generate_midi([start, start + i])
      end
      c = Choice.create(multiple_choice_question: question, midi: blob, name: alph[index])
      if i == interval
        Answer.create(user: user, correct_answer: c.id, question: question)
      end
    end
    return question
  end

  def note2num(note)
    # c4 = 60 = middle c
    note_letter = note.match(/[a-gs]+/)[0]
    octave = note.match(/\d/)[0]
    letters = %w(c cs d ds e f fs g gs a as b)
    12 * (octave.to_i + 1) + letters.index(note_letter)
  end

  private

  def generate_midi(notes, name = 'Exercise', tempo = 60)
    seq = Sequence.new

    # Create a first track for the sequence. This holds tempo events and stuff
    # like that.
    track = Track.new(seq)
    seq.tracks << track
    track.events << Tempo.new(Tempo.bpm_to_mpq(tempo))
    track.events << MetaEvent.new(META_SEQ_NAME, name)

    # Create a track to hold the notes. Add it to the sequence.
    track = Track.new(seq)
    seq.tracks << track

    # Give the track a name and an instrument name (optional).
    track.instrument = GM_PATCH_NAMES[0]

    quarter_note_length = seq.note_to_delta('quarter')
    notes.each do |note|
      track.events << NoteOn.new(0, note, 127, 0)
      track.events << NoteOff.new(0, note, 127, quarter_note_length)
    end

    StringIO.open do |io|
      seq.write(io)
      return 'data:;base64,' + Base64.encode64(io.string).gsub(/\s+/, '')
    end
  end
end
