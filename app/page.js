"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import { useState } from "react";

function MessageCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function MessageRow({ message }) {
  return (
    <tr>
      <td>{message.author}</td>
      <td>{message.message}</td>
      <td>{message.date}</td>
    </tr>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          value={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show messages in stock
      </label>
    </form>
  );
}

function MessageTable({ messages, filterText }) {
  const rows = [];
  let lastCategory = null;
  messages.forEach((message) => {
    if (message.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !message.stocked) {
      return;
    }
    if (message.category !== lastCategory) {
      rows.push(
        <MessageCategoryRow
          category={message.category}
          key={message.category}
        />
      );
    }
    rows.push(<MessageRow message={message} key={message.name} />);
    lastCategory = message.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableMessagesTable({ messages }) {
  const [filterText, setFilterText] = useState("");
  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <MessageTable
        messages={messages}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

export default function Home() {
  const [blogMessages, setBlogMessages] = useState([]);

  fetch(
    "https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec"
  )
    .then((response) => response.json())
    .then((data) => {
      setBlogMessages(data);
    });

  return (
    <main className={styles.main}>
      <SearchBar />
      <FilterableMessagesTable messages={blogMessages} />
    </main>
  );
}
