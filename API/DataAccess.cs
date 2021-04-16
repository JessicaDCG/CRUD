using MongoDB.Driver;
using System;

namespace API
{
    public class DataAccess
    {
        #region Variables
        MongoClient client;
        public IMongoDatabase dataBase;
        #endregion

        public DataAccess()
        {
            try
            {
                client = new MongoClient("mongodb://localhost:27017");
                dataBase = client.GetDatabase("dbActivities");
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
