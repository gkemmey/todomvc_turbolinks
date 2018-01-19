class TodosController < ApplicationController
  def index
    load_todos
  end

  def create
    Todo.belonging_to(session_user).create(todo_params)
    redirect_to todos_path
  end

  def update
    Todo.belonging_to(session_user).where(id: params[:id]).update_all(todo_params.to_h)
    redirect_to todos_path
  end

  def update_many
    Todo.belonging_to(session_user).where(id: params[:ids]).update_all(todo_params.to_h)
    redirect_to todos_path
  end

  def destroy
    Todo.belonging_to(session_user).where(id: params[:id]).destroy_all
    redirect_to todos_path
  end

  def destroy_many
    Todo.belonging_to(session_user).where(id: params[:ids]).destroy_all
    redirect_to todos_path
  end

  private

    def todo_params
      params.require(:todo).permit(:title, :is_completed)
    end

    def load_todos
      @todos = Todo.belonging_to(session_user).order(created_at: :asc)

      if filtering?
        @todos = @todos.completed(params[:completed] == 'true')
      end
    end

    def filtering?
      # it'll be a string true or false added to the url query
      !params[:completed].nil?
    end
    helper_method :filtering?
end
