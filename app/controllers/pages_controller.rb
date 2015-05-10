class PagesController < ApplicationController
  def home
    @units = Unit.all
    @game = Game.new
  end

  def profile
  end

  def treasureHunties
  end

  def collectedInventions
  end

  def topPlayers
  end

  def help
  end

  def play
    #gon.units = Unit.all
    @city = City.find(params[:city_id])
    gon.city = @city
    @checkpoint = Checkpoint.find(params[:checkpoint_id])
    @game = Game.find(params[:game_id])
    @game.city_id = @city.id
    gon.game = @game
    @game.save

    # Fetching Questions for game
    @educational_level = @checkpoint.educational_level_id
    @lessons = @game.lessons.pluck(:id)
    @questions = Question.where(lesson_id: @lessons, educational_level: @educational_level)
    gon.questions = @questions

    # Fetching Questions Locations
    @locations = QuestionLocation.where(city_id: @city.id)
    gon.locations = @locations
  end

  def arrangeInvention
  end

  def information
  end

  def checkpointsMap
    @checkpoints = Checkpoint.all 

    # Fetching random invention
    @inventions = Invention.all.pluck(:id)
    random = rand(1..@inventions.length)
    @game_invention = Invention.find(random)    

    @game = Game.new
    @game.mode = params[:mode]
    @game.invention_id = @game_invention.id 
    @game.save
    
    @lessons = Lesson.find params[:game][:lesson_ids].split(',')
    @game.lessons << @lessons
  end

  def addQuestionsHints
  end
end
