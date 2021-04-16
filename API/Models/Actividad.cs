using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace API.Models
{
    public class Actividad
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Descripcion")]
        public string Descripcion { get; set; }

        [BsonElement("FechaRegistro")]
        public DateTime FechaRegistro { get; set; }

        [BsonElement("FechaModificado")]
        public DateTime FechaModificado { get; set; }

        [BsonElement("Terminado")]
        public bool Terminado { get; set; }
    }
}
