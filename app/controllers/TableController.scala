package controllers

import javax.inject._

import play.api.mvc._

import scala.util.parsing.json.{JSONArray, JSONObject}

case class DomainInfo(id: String, domainName: String, price: String, clicks: String, updateTime: String, status: String) {
  override def toString: String = {
    val map = Map("id" -> id, "domainName" -> domainName, "price" -> price, "clicks" -> clicks, "updateTime" -> updateTime, "status" -> status)
    JSONObject(map).toString()
  }
}

@Singleton
class TableController @Inject() extends Controller {

  def tables = Action {
    Ok(views.html.app.tables())
  }

  def tableData = Action {
    val domainList = (1 to 10).map(x => DomainInfo(x.toString, "2", "3", "4", "5", "6")).toList
    val json = JSONArray(domainList).toString()
    Ok(json).as("application/json")

  }
}
