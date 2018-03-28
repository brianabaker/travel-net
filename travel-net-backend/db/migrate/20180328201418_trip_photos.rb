class TripPhotos < ActiveRecord::Migration[5.1]
  def change
    create_table :trip_photos do |t|
      t.string :trip_photo_url
      t.belongs_to :trip
    end
  end
end
