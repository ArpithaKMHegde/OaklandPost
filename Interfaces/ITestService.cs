using System.Collections.Generic;
using System.Threading.Tasks;
using adv_web_dev.Models;

namespace adv_web_dev.Interfaces
{
    public interface ITestService
    {
        Task<List<TestModel>> GetTestData();
    }
}
