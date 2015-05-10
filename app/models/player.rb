class Player < ActiveRecord::Base
  belongs_to :avatar
  has_many :games
  has_and_belongs_to_many :inventions
end
