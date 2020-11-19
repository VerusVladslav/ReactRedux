using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using LibIT.Web.Entities;
using LibIT.Web.Helpers;
using LibIT.Web.Models;
using LibIT.Web.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LibIT.Web.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AccountController : ControllerBase
    {
        private readonly EfContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly IJwtTokenService _IJwtTokenService;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        private readonly IWebHostEnvironment _env;

        public AccountController(EfContext context,
            UserManager<DbUser> userManager,
            SignInManager<DbUser> signInManager,
            IJwtTokenService IJwtTokenService,
            IEmailSender emailSender,
            IConfiguration configuration,
            IWebHostEnvironment env)
        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
            _IJwtTokenService = IJwtTokenService;
            _emailSender = emailSender;
            _configuration = configuration;
            _env = env;
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]UserLoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null)
            {
                return BadRequest(new { invalid = "Даний користувач не знайденний" });
            }

            var result = _signInManager
                .PasswordSignInAsync(user, model.Password, false, false).Result;

            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "Невірно введений пароль" });
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(
                new
                {
                    token = _IJwtTokenService.CreateToken(user)
                });
        }
    
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterViewModel model)
        {
            //return Ok();

            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var base64 = model.Photo;
            if (base64.Contains(","))
            {
                base64 = base64.Split(',')[1];
            }
            var bmp = FromBase64StringToImage(base64);

            var serverPath = _env.ContentRootPath; //Directory.GetCurrentDirectory(); //_env.WebRootPath;

            var path = Path.Combine(serverPath, "Uploads"); //
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var fileName = Path.GetRandomFileName() + ".jpg";

            var filePathSave = Path.Combine(path, fileName);

            bmp.Save(filePathSave, ImageFormat.Jpeg);

            var user = new DbUser
            {
                Email = model.Email,
                UserName = model.Email,
                Image = fileName, //"https://cdn.pixabay.com/photo/2017/07/28/23/34/fantasy-picture-2550222_960_720.jpg",
                Age = 30,
                Phone = model.Phone,
                Description = "PHP programmer"
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "Хюстон у нас проблеми!" });
            }

            return Ok();
        }
        private static Bitmap FromBase64StringToImage(string base64String)
        {
            byte[] byteBuffer = Convert.FromBase64String(base64String);
            try
            {
                using (MemoryStream memoryStream = new MemoryStream(byteBuffer))
                {
                    memoryStream.Position = 0;
                    using (Image imgReturn = Image.FromStream(memoryStream))
                    {
                        memoryStream.Close();
                        byteBuffer = null;
                        return new Bitmap(imgReturn);
                    }
                }
            }
            catch { return null; }

        }


        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel forgotPasswordModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Bad Model");
            var user = await _userManager.FindByEmailAsync(forgotPasswordModel.Email);
            if (user == null)
                return BadRequest("Not faound user");
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var frontEndURL = _configuration.GetValue<string>("FrontEndURL");

            var callbackUrl =
                $"{frontEndURL}/resetpassword?userId={user.Id}&" +
                $"code={WebUtility.UrlEncode(token)}";

                //Url.Action(nameof(ResetPassword), "AccountController", new { token, email = user.Email }, Request.Scheme);
            var message = new Message(new string[] { forgotPasswordModel.Email }, "Reset password token", 
                $"Please reset password by clicking here: " +
               $"<a href='{callbackUrl}'>link</a>");
            _emailSender.SendEmail(message);

            return Ok();
        }


    }
}