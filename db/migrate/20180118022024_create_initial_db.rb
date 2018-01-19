class CreateInitialDb < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string  :session_user_id
      t.string  :title
      t.boolean :is_completed,             default: false

      t.timestamps null: false
    end
  end
end
