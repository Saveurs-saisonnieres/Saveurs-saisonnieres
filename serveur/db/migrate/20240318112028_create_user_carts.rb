class CreateUserCarts < ActiveRecord::Migration[7.1]
  def change
    create_table :user_carts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :cart, null: false, foreign_key: true

      t.timestamps
    end
  end
end
