class PagesController < ApplicationController
  def home
    @units = Unit.all
    @game = Game.new
  end

  def profile
  end

  def treasureHunties
    @game = Game.find(params[:game_id])
    @game_invention = Invention.find(@game.invention_id)
    gon.game = @game
  end

  def collectedInventions
  end

  def topPlayers
  end

  def help
  end

  def play
    #gon.units = Unit.all

    # # Fetching random invention
    # @inventions = Invention.all.pluck(:id)
    # random = rand(1..@inventions.length)
    # @invention = Invention.find(random)
    # gon.game_invention = @invention 

    @city = City.find(params[:city_id])
    gon.city = @city

    @checkpoint = Checkpoint.find(params[:checkpoint_id])
    gon.checkpoint = @checkpoint

    @game = Game.find(params[:game_id])
    @game.city_id = @city.id
    # @game.invention_id = @invention.id
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

    @game_invention = Invention.find(@game.invention_id)
    case @checkpoint.id
    when 1
      @part = @game_invention.part1
    when 2
      @part = @game_invention.part2
    when 3
      @part = @game_invention.part3
    when 4
      @part = @game_invention.part4    
    when 5
      @part = @game_invention.part5
    when 6
      @part = @game_invention.part6           
    end

    #update score
    @game.score = params[:score]
    @game.correct_questions = params[:correct_questions]
    @game.save
  end

  def arrangeInvention
  end

  def information
    @game = Game.find(params[:game_id])
    @game_invention = Invention.find(@game.invention_id)
  end

  def checkpointsMap
    @checkpoints = Checkpoint.all 

    # # Fetching random invention
    # @inventions = Invention.all.pluck(:id)
    # random = rand(1..@inventions.length)
    # @game_invention = Invention.find(random)    

    # @game = Game.new
    # @game.mode = params[:mode]
    # @game.invention_id = @game_invention.id 
    # @game.save
    if (params[:game_id].present?)
      @game = Game.find(params[:game_id])
    end

    if(params[:game].present?)
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
  end

  def addQuestionsHints
  end

  def register 
  end

  # protected
  # def part(checkpoint_id)
  #   case checkpoint_id
  #   when 1
  #     @part = @invention.part1
  #   when 2
  #     @part = @invention.part2
  #   when 3
  #     @part = @invention.part3
  #   when 4
  #     @part = @invention.part4    
  #   when 5
  #     @part = @invention.part5
  #   when 6
  #     @part = @invention.part6           
  # end
end
