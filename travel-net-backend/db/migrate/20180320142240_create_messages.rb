class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :content
      t.references :user
      t.references :chatroom
      t.timestamps
    end
  end
end
