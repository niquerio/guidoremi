# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161101133236) do

  create_table "answers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.string   "question_type"
    t.integer  "question_id"
    t.string   "user_answer"
    t.string   "correct_answer"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["question_type", "question_id"], name: "index_answers_on_question_type_and_question_id", using: :btree
    t.index ["user_id"], name: "index_answers_on_user_id", using: :btree
  end

  create_table "choices", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "multiple_choice_question_id"
    t.string   "midi"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["multiple_choice_question_id"], name: "index_choices_on_multiple_choice_question_id", using: :btree
  end

  create_table "multiple_choice_questions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "question_generator_id"
    t.string   "prompt"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["question_generator_id"], name: "index_multiple_choice_questions_on_question_generator_id", using: :btree
  end

  create_table "question_generators", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.text     "parameters", limit: 65535
    t.string   "type"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "order"
    t.integer  "skill_id"
    t.string   "slug"
    t.index ["skill_id"], name: "index_question_generators_on_skill_id", using: :btree
  end

  create_table "skills", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "slug"
  end

  create_table "trees", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "level"
    t.integer  "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "parent_id"
    t.integer  "skill_id"
    t.index ["skill_id"], name: "index_trees_on_skill_id", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "provider",                             default: "email", null: false
    t.string   "uid",                                  default: "",      null: false
    t.string   "encrypted_password",                   default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                        default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.text     "tokens",                 limit: 65535
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.index ["email"], name: "index_users_on_email", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

  add_foreign_key "answers", "users"
  add_foreign_key "choices", "multiple_choice_questions"
  add_foreign_key "multiple_choice_questions", "question_generators"
  add_foreign_key "trees", "skills"
end
