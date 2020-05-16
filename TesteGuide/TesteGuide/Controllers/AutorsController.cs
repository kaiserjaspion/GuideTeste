using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TesteGuide.Contexts;
using TesteGuide.Models;

namespace TesteGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoresController : ControllerBase
    {
        private readonly GuideContext _context;

        public AutoresController(GuideContext context)
        {
            _context = context;
        }

        // GET: api/Autors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Autor>>> GetAutores()
        {
            try
            {
                return await this.AdjustAutores(await _context.Autores.ToListAsync());
            }
            catch (Exception) { throw; }
        }
        
        // POST: api/Autors
        [HttpPost]
        public async Task<ActionResult<Autor>> PostAutor(Autor autor)
        {
            try
            {
                if(!AutorExists(autor.Id))
                {
                    _context.Autores.Add(autor);
                    _context.SaveChanges();
                    
                }
                else
                {
                    _context.Entry(autor).State = EntityState.Modified;
                    _context.SaveChanges();
                }
                return autor;
            }
            catch (Exception) { throw; }
        }


        [HttpPost]
        [Route("save")]
        public async Task<ActionResult<IEnumerable<Autor>>> PostAutors ([FromBody] List<Autor> autor)
        {
            try
            {

                _context.AddRange(autor);
                _context.SaveChanges();
                
                return await this.AdjustAutores(autor);
            }
            catch (Exception) { throw; }
        }


        // DELETE: api/Autors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Autor>> DeleteAutor(int id)
        {
            try
            {
                Autor autor = await _context.Autores.FindAsync(id);
                if (autor == null)
                {
                    return NotFound();
                }

                _context.Autores.Remove(autor);
                await _context.SaveChangesAsync();

                return autor;
            }
            catch (Exception) { throw; }
        }

        private bool AutorExists(int id)
        {
            return _context.Autores.Any(e => e.Id == id);
        }

        private async Task<ActionResult<IEnumerable<Autor>>> AdjustAutores(List<Autor> Autores)
        {
            try
            {
                foreach(var autor in Autores)
                {
                    var nomes = autor.Nome.ToLower().Split(' ');
                    var lenght = nomes.Count();
                    var nome = String.Empty; 
                    if(nomes.Count() > 2 
                        && ((nomes.Last().ToUpper() == "FILHO")
                        || (nomes.Last().ToUpper() == "FILHA") 
                        || (nomes.Last().ToUpper() == "NETO") 
                        || (nomes.Last().ToUpper() == "NETA") 
                        || (nomes.Last().ToUpper() == "SOBRINHO") 
                        || (nomes.Last().ToUpper() == "SOBRINHA") 
                        || (nomes.Last().ToUpper() == "JUNIOR")))
                    {
                        nome = nomes[lenght-2].ToUpper() + " " + nomes[lenght-1].ToUpper();
                        lenght = lenght - 2;
                    }
                    else
                    {
                        nome = nomes[lenght -1].ToUpper();
                        lenght = lenght - 1;
                    }
                    for (var i = 0; i < lenght; i++)
                    {
                        nome = nome + ", ";
                        if ((nomes[i] == "da")
                            || (nomes[i] == "de")
                            || (nomes[i] == "do")
                            || (nomes[i] == "das")
                            || (nomes[i] == "dos"))
                            nome = nome + nomes[i];
                        else
                            nome = nome + nomes[i].First().ToString().ToUpper() + nomes[i].Substring(1);
                    }
                    autor.Nome = nome;
                }
                return Autores;
            }
            catch (Exception) { throw; }
        }
    }
}
