using AjaxDemo.Data;
using AjaxDemo.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AjaxDemo.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString =
            "Data Source=.\\sqlexpress;Initial Catalog=People;Integrated Security=True;Trust Server Certificate=true;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
           
            var repo = new PeopleRepo(_connectionString);
            return Json(repo.GetAll());
        }

        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        public void Update(Person p)
        {
            var r = new PeopleRepo(_connectionString);
            r.Update(p);
        }

        [HttpPost]
        public void Delete(int id)
        {
            var r = new PeopleRepo(_connectionString);
            r.Delete(id);
          
        }
    }
}
