function gestionar_grupo(){
	cargar_menu_grupos();
}
 
function cargar_menu_grupos(){
	$('#izquierda').load('php/cargar_menu_grupos.php');
}
 
function menuCargado(){
 
	$('#izquierda li a').click(function(){
		console.log($(this).attr('href'));
		$('#izquierda li a.activo').removeClass('activo');
		$(this).addClass('activo');		
		$('#principal').load($(this).attr('href'),grupoCargado);
		return false;
	});
}
 
function grupoCargado(){
	$('table.grupo td:nth-child(1)').hide();
	$('table.grupo td:nth-child(2)').click(infoAlumno);
	$('table.grupo td:nth-child(3)').click(borrarAlumno);
	$('table.grupo td:nth-child(4)').click(editarAlumno);
}
 
function infoAlumno(){
	//Consigo el cÃ³digo del alumno
 
	var codigo=$(this).closest('tr').find('td:nth-child(1)').html();
	console.log($(this).html()+' ('+codigo+')');
 
	//Crea un dialogo jQuery que muestre 
	//todos los datos del alumno y un 
	//boton que ponga "Cerrar"
 
	//Oculto el futuro diÃ¡logo
	//Cuando deje de ser un diÃ¡logo ("destroy")
	//vuelve a su estado anterior, que es oculto
 
	$('#dialogo_info').hide();
 
	//Lo lleno con los datos del alumno mediante un load y al acabar muestro el dialogo
 
	$('#dialogo_info').load('php/ficha_alumno.php?alumno='+codigo,mostrar);
	function mostrar(){
		$('#dialogo_info').dialog({
			modal:true,
			buttons:{
				"OÃ­do Cocina":function(){
					// $(this).dialog('close');
					$( this).dialog( "destroy" );
					}
			}
		});
	}
}
 
function borrarAlumno(){
	console.log('en construcciÃƒÂ³n');
}
 
function editarAlumno(){
	console.log('en construcciÃƒÂ³n');
	var codigo=$(this).closest('tr').find('td:first-child').html();
	$('#formulario_alumno').load('php/formulario_editar_alumno.php?alumno='+codigo,mostrarEdicion);
	function mostrarEdicion(){
		$('#formulario_alumno').dialog({
			modal:true,
			buttons:{
				"Actualizar":function(){
					$(this).dialog('close');
					$(this).dialog( "destroy" );
					$(this).hide();
					//Llamo al post
					$.post('php/actualizar_alumno.php',$('#editar_alumno').serialize(),function(datos){
						if(datos.indexOf('ERROR') > -1){
							alert('ERROR');
						}else{
							$('#izquierda li a.activo').click();
						}
					});
					},
				"Cancelar":function(){
					$(this).dialog('close');
					$(this).dialog( "destroy" );
					$(this).hide();
					}
			}
		});
	}
}
