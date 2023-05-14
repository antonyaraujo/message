"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect } from "react";
import { useState } from "react";

function MessageRow({ message }) {
  return (
    <tr>
      <td>{message[1]}</td>
      <td>{message[0]}</td>
      <td>{message[2]}</td>
    </tr>
  );
}

function SearchBar({ filterText, onFilterTextChange }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </form>
  );
}

function MessageTable({ messages, filterText, rowsMessages }) {
  useEffect(() => {
    const rows = [];
    messages.map((message) => {
      let verify_message = String(message[0]);
      if (
        verify_message.toLowerCase().includes(filterText.toLowerCase()) ||
        filterText === ""
      ) {
        rows.push(
          <MessageRow message={message} key={message[1] + message[2]} />
        );
      }
    });
    rowsMessages[1](rows);
  }, [filterText, messages]);

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Messages</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{rowsMessages[0]}</tbody>
    </table>
  );
}

function FilterableMessagesTable({ messages, rowsMessages }) {
  const [filterText, setFilterText] = useState("");

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
      <MessageTable
        messages={messages}
        filterText={filterText}
        rowsMessages={rowsMessages}
      />
    </div>
  );
}

export default function Home() {
  const [blogMessages, setBlogMessages] = useState([]);
  const [rowsMessages, setRowsMessages] = useState([]);
  fetch(
    "https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec"
  )
    .then((response) => response.json())
    .then((data) => {
      setBlogMessages(data);
    });
  return (
    <main className={styles.main}>
      <FilterableMessagesTable
        messages={blogMessages}
        rowsMessages={[rowsMessages, setRowsMessages]}
      />
    </main>
  );
}
