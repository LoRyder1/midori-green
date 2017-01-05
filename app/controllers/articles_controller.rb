class ArticlesController < ApplicationController
  def index
    
  end

  def new
    @article = Article.new
    
  end

  def create
    text = params[:article][:text]

    @body = text

    if request.xhr?
      render json: {text: @body}
    else
      render json: @body
    end
    
  end
end


    # respond_to do |format|
    #   format.json {
    #     render plain: "hello world"
    #   }
    # end