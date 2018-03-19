class CreateTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :trips do |t|
      t.string :name
      t.string :locations, array: true, default: []
      t.belongs_to :user
      t.timestamps
    end
  end
end
