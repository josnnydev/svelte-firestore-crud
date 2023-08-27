<script>
  // @ts-nocheck

  import {
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { db } from "./firebase";
  import { onDestroy } from "svelte";
  import Toastify from "toastify-js";

  let task = {
    title: "",
    description: "",
  };

  let tasks = [];
  let editStatus = false;
  let currentId = "";

  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
        ...task,
        createdAt: new Date()
      });


      Toastify({
        text: "new task created",
      }).showToast();


    } catch (error) {
      throw new Error("task not added");
    }
  };

  const deleteTask = async (id) => {
    try {
      confirm("desea borrar la tarea??");
      await deleteDoc(doc(db, "tasks", id));
      Toastify({
        text: "task deleted",
        style: {
    background: "linear-gradient(to right, red, pink)",
  },
      }).showToast();
      
    } catch (error) {
      throw new Error("task not deleted for cause a error");
    }
  };

  const editTask = (currentask) => {
    task.title = currentask.title;
    task.description = currentask.description;
    currentId = currentask.id;
    editStatus = true;
  };

  const updateTask = async () => {
    try {
      await updateDoc(doc(db, "tasks", currentId), task);
    } catch (error) {
      throw new Error("not updating");
    }
  };

  const handleSubmit = () => {
    try {
      if (!editStatus) {
        addTask();
      } else {
        updateTask();
        Toastify({
        text: "task updated",
      }).showToast();
      }
    } catch (error) {
      throw new Error("errorrrr!!!");
    }
    task = {
      title: "",
      description: "",
    };
    editStatus = false;
    currentId = "";
  };

  const unsub = onSnapshot(
    collection(db, "tasks"),
    (querySnapshot) => {
      tasks = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    },
    (error) => console.log(error)
  );

  onDestroy(unsub);
</script>

<main>
  <div class="container p-4">
    <h1>Create Your Task</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form on:submit|preventDefault={handleSubmit} class="card card-body p-5">
        <div class="mb-3">
          <label for="title" class="text-secondary fs-5">Title</label>
          <input
            bind:value={task.title}
            type="text"
            placeholder="write a new task"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="description" class="text-secondary fs-5">Description</label>
          <textarea
            bind:value={task.description}
            rows="3"
            placeholder="write a task description"
            class="form-control"
          />
        </div>
          <div>
            <button class="btn btn-primary ">Save!</button>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        {#each tasks as task}
          <div class="card card-body mt-2">
            <div class="d-flex justify-content-between">
              <h5>{task.title}</h5>

              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <i class="material-symbols-outlined" on:click={editTask(task)}
                >edit</i
              >
            </div>
            <p>{task.description}</p>
             
            <div>
              <button class="btn btn-danger" on:click={deleteTask(task.id)}>
                <i
                  class="material-symbols-outlined"
                  style="vertical-align: middle;">delete_forever</i
                >
                Delete</button
              >
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
</style>
