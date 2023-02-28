// const new_post_button = document.querySelector('#new-post-form')

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
  
    if (name && text ) {
      const response = await fetch(`/dashboard/add`, { // 이것은 무엇인가? 어디 주소인가?
        method: 'POST',
        body: JSON.stringify({ name, text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  console.log("--------------------------------------");
  console.log(response);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/dashboard/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
    // document
    // .querySelector('#new-post-form')
    // .addEventListener('submit', newFormHandler);
  document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);
  