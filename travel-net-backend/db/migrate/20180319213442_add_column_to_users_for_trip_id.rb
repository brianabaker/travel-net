class AddColumnToUsersForTripId < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :current_trip_id, :integer
  end
end