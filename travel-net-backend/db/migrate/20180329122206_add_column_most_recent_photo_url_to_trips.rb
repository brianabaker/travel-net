class AddColumnMostRecentPhotoUrlToTrips < ActiveRecord::Migration[5.1]
  def change
    add_column :trips, :most_recent_photo_url, :string
  end
end
