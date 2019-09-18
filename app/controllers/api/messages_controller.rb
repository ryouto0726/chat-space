class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id]) #今いるグループの情報をパラムスの値を元にDBから取得。
    @messages = @group.messages.includes(:user).where('id > ?', params[:id])
  end
end