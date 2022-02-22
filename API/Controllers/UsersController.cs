using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOs;
using AutoMapper;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
   
    public class UsersController : BaseApiController //inheriting from baseapi
    {
        
        private readonly IUserRepository _userRepository;

        private readonly IMapper _mapper;
        
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
           _userRepository = userRepository;
            // access to db
        }
        [HttpGet]
    
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users =  await _userRepository.GetMembersAsync();
           
           return Ok(users);
        }
        // asynchronous code helps makes your data scalable 

        //specifies user id eg 3
       
         [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
            
        }
        //update user

        // [HttpPut]
        // public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        // {
        //     var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //     var user = await _userRepository.GetUserByUsernameAsync(username);

            

            

        //     _mapper.Map(memberUpdateDto, user);
        //     _userRepository.Update(user);

        //     if (await _userRepository.SaveAllAsync()) return NoContent();

        //     return BadRequest("Failed to update user");

        // }




    }
}