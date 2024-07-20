import PropTypes from 'prop-types';
import { Person } from './Person';
import { useState } from 'react';

export const People = ({persons, setPersons}) => {
  //Estado para identificar a la persona que se esta editando
  const[editingId, setEditingId] = useState(null);
  //Estado para la persona que se edito
  const[editedPerson, setEditedPerson] = useState({
    name: '',
    role: '',
    img: ''
  });

  //Estado para establecer si se esta editando o no
  const [isEditing, setIsEditing] = useState(false);

  //Estado para guardar la persona eliminada
  const[personToDelete, setPersonToDelete] = useState(null);

  //Metodo para capturar los datos desde el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  //Metodo para crear un nuevo empleado
  const handleCreate = (e) => {

    //Prevenir que el navegado se actualice
    e.preventDefault();
    setPersons([...persons, { id: persons.length + 1, ...editedPerson  }]);
    //Resetear la variable de estado de editedPerson
    setEditedPerson({name: '', role: '', img: ''});

  }

  //Método para editar los datos de una persona
  const handleEdit = (id) => {

    //Establecemos el ID de la persona a editar
    setEditingId(id);
    //Activar el estado de edición
    setIsEditing(true);
    //Buscar la persona a editar a travez del ID
    const personToEdit = persons.find(person => person.id === id) ;
    //Lo asigna a personToEdit
    setEditedPerson({...personToEdit});
  }

  //Metodo para actualizar los datos modificados
  const handleSave = (e) => {
    //Prevenir que el navegado se actualice
    e.preventDefault();
    //Actualizar el estado de de persons al guardar los datos modificados
    const updatedPersons = persons.map(person => person.id === editingId ? editedPerson : person);
    //Actualizar los datos de la persona en el array
    setPersons(updatedPersons);
    //Desactivar el estado de edición
    setIsEditing(false);
    //Resetear la variable de estado a null
    setEditingId(null);
    //Resetear variable editedPerson
    setEditedPerson({name: '', role: '', img: ''});
  }

  //Métodos para eliminar una persona del array
  //Obtener el ID de la persona a eliminar del Array
  const handleDelete = (id) => {
    setPersonToDelete(id);
  }

  //
  const confirmDelete = () => {
    setPersons(persons.filter(person => person.id !== personToDelete));
    setPersonToDelete(null);
  }
 
  const cancelDelete = () => {
    setPersonToDelete(null);
  }

  return (
    <div>
      <h2 className='text-center my-4'>IT TEAM</h2>
      <div className='container'>
        <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
          {persons.map((person) => {
            return(
              <div key={person.id}>
                <Person
                  id={person.id}
                  name={person.name}
                  img={person.img}
                  role={person.role}
                  handleEdit={() => handleEdit(person.id)}
                  handleDelete={handleDelete}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/*Renderiza el Formulario para crear o editar los datos de una persona*/}
      <div className='container mt-4 row p-2'>
        <h2 className='text-center my-4'>{isEditing ? 'Actualizar Empleado' : 'Crear nuevo empleado'}</h2>
        <form className='border border-dark rounded p-4'>
          <div className='mb-3'>
            <label className='form-label'>Nombres</label>
            <input type="text" name='name' value={editedPerson.name} onChange={handleChange} className='form-control' aria-describedby="nombre" required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Cargo</label>
            <input type="text" name='role' value={editedPerson.role} onChange={handleChange} className='form-control' required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Avatar</label>
            <input type="text" name='img' value={editedPerson.img} onChange={handleChange} className='form-control' required />
          </div>
          <button type="submit" className='btn btn-primary ' onClick={isEditing ? handleSave : handleCreate}>
            {isEditing ? 'Modificar' : 'Crear'}</button>
        </form>
      </div>
      {/*Modal de confirmación de eliminación*/}
      <div id="deleteModal" className='modal fade' tabIndex="-1">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-tittle'>Confirmar Eliminación</h4>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={cancelDelete}></button>
            </div>
            <div className='modal-body'>
              <p>¿Estás seguro de eliminar a {persons.find(person => person.id === personToDelete)?.name}</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={cancelDelete}>Cancelar</button>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal' onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

People.propTypes = {
  persons: PropTypes.array,
  setPersons: PropTypes.func
}