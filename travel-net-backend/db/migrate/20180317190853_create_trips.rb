class CreateTrips < ActiveRecord::Migration[5.1]

  def change
    create_table :trips do |t|
      t.string :name
      t.boolean :active, :default => true
      t.belongs_to :user
      t.timestamps
    end
  end

end
