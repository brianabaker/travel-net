class AddTripStatusToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :on_trip, :boolean, :default => false
  end
end
