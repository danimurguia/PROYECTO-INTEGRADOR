

let products = [];


        // example {id:1592304983049, title: 'Deadpool', year: 2015}
        const addProduct = (ev)=>{
            ev.preventDefault();  //to stop the form submitting
            
            
              
            let product = {
                id: Date.now(),
                nombre: document.getElementById('nombre').value,
                precio: document.getElementById('precio').value,
                marca: document.getElementById('marca').value,
                descrip: document.getElementById('descrip').value,
                color: document.getElementById('color').value,
                talla: document.querySelector('input[id="talla"]:checked')?.value,
                categoria: document.querySelector('input[id="categoria"]:checked')?.value,
                archivo: document.getElementById('archivo').value,
               

                

                
                
            }

            

           
            
            //compare the input values to the values inside the if conditional
            if(nombre.value, precio.value,  marca.value, descrip.value, color.value, talla.value, categoria.value, archivo.value != "" ) 
            {
                products.push(product);
                //add the product to the array products
                
    
                //for display purposes only
                console.warn('Producto Agregado al Local Storage' , {products} );
                localStorage.setItem('Productos', JSON.stringify(products) );  //saving to localStorage
                Swal.fire(
                    'Producto Agregado!',
                    'Puedes agregar más productos',
                    'success'
                  )
                document.querySelector('form').reset();// to clear the form for the next entries
            
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Completa todos los campos',
                    
                  })
            }
       

        }
        
        document.addEventListener('DOMContentLoaded', ()=>{
        document.getElementById('btnSubmit').addEventListener('click', addProduct);
    });
   
           
             

    