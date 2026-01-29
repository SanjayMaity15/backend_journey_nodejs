function App() {
	return (
		<div>
      <form action="http://localhost:8000/send" method="post" encType="multipart/form-data">
        <input type="text"  name="username"/>
        <input type="text" name="age" />
        <input type="file" name="profile" />
        <button type="submit">Submit</button>
      </form>
		</div>
	);
}

export default App;
