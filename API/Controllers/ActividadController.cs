using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ActividadController : ControllerBase
    {
        [HttpGet("select")]
        public IEnumerable<Actividad> SelectAll()
        {
            try
            {
                DataAccess cn = new DataAccess();
                var entityDB = cn.dataBase.GetCollection<Actividad>("Actividad");
                return entityDB.Find(c => true).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        
        [HttpGet("select/{id}")]
        public Actividad SelectById(string id)
        {
            try
            {
                DataAccess cn = new DataAccess();
                var entityDB = cn.dataBase.GetCollection<Actividad>("Actividad");
                return entityDB.Find(c => c.Id == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        
        [HttpPost("insert")]
        public IActionResult Insert(Actividad entity)
        {
            try
            {
                DataAccess cn = new DataAccess();
                var entityDB = cn.dataBase.GetCollection<Actividad>("Actividad");
                entity.FechaRegistro = DateTime.Now;
                entityDB.InsertOne(entity);
                return Ok("Correcto!");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        
        [HttpPut("update")]
        public IActionResult Update(Actividad entity)
        {
            try
            {
                DataAccess cn = new DataAccess();
                var entityDB = cn.dataBase.GetCollection<Actividad>("Actividad");
                var filter = Builders<Actividad>.Filter.Eq(c => c.Id, entity.Id);
                var update = Builders<Actividad>.Update.Set(c => c.FechaModificado, DateTime.UtcNow);

                System.Reflection.PropertyInfo[] listaPropiedades = typeof(Actividad).GetProperties();
                foreach (System.Reflection.PropertyInfo propiedad in listaPropiedades)
                {
                    var value = propiedad.GetValue(entity, null);
                    if (value != null && !value.Equals(DateTime.MinValue))
                    {
                        update = update.Set(propiedad.Name, value);
                    }
                }

                entityDB.UpdateOne(filter, update);
                return Ok("Correcto!");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                DataAccess cn = new DataAccess();
                var entityDB = cn.dataBase.GetCollection<Actividad>("Actividad");
                entityDB.DeleteOne(c => c.Id == id);
                return Ok("Correcto!");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

    }
}