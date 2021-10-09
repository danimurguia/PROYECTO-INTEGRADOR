

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
                talla: document.getElementById('talla').value,
                archivo: document.getElementById('archivo').value

                

                
            }

            

           
            
            //saving to localStorage
            if(nombre.value, precio.value,  marca.value, descrip.value, color.value, talla.value, archivo.value != "" ) 
            {
                products.push(product);
                //document.forms[0].reset(); 
                
    
                //for display purposes only
                console.warn('Producto Agregado al Local Storage' , {products} );
                localStorage.setItem('myProducts', JSON.stringify(products) );
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
        
       
           
             

        

