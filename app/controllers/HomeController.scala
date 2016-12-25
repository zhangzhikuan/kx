package controllers

import javax.inject._
import play.api._
import play.api.mvc._

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
case class SideBar(title: String, href: String = "javascript:;", children: List[SideBar] = null)

@Singleton
class HomeController @Inject() extends Controller {

  /**
    * Create an Action to render an HTML page with a welcome message.
    * The configuration in the `routes` file means that this method
    * will be called when the application receives a `GET` request with
    * a path of `/`.
    */
  def index = Action {
    val sub1 = SideBar(title = "abcd", href = "/tables")
    val t1 = SideBar(title = "系统管理", children = List(sub1, sub1, sub1))
    val t2 = SideBar(title = "系统管理2", children = List(sub1, sub1, sub1))
    val sidebars = List(t1, t2)
    Ok(views.html.main(sidebars))
  }

}
