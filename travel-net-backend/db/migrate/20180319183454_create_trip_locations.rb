class CreateTripLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :trip_locations do |t|
      t.decimal :lat, {:precision=>10, :scale=>6}
      t.decimal :lng, {:precision=>10, :scale=>6}
      t.belongs_to :trip
      t.timestamps
    end
  end
end
