import React, { useState, useEffect, KeyboardEvent } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

interface ChipProps {
  data: {
    [key: string]: string;
  };
}

const ChipComponent: React.FC<ChipProps> = ({ data }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [availableItems, setAvailableItems] = useState<string[]>(
    Object.keys(data)
  );
  const [highlightedChip, setHighlightedChip] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Remove highlighting when user types
    setHighlightedChip(null);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // If backspace is pressed and there is no input value, highlight or remove the last chip
    if (e.key === "Backspace" && inputValue === "") {
      if (highlightedChip !== null) {
        // Remove the highlighted chip
        const newSelectedItems = selectedItems.slice();
        const removedItem = newSelectedItems.splice(highlightedChip, 1)[0];
        setAvailableItems([...availableItems, removedItem]);
        setSelectedItems(newSelectedItems);
        setHighlightedChip(null);
      } else {
        if (selectedItems.length > 0) {
          // Highlight the last chip
          setHighlightedChip(selectedItems.length - 1);
        }
      }
    }
  };

  const handleItemClick = (item: string) => {
    setSelectedItems([...selectedItems, item]);
    setAvailableItems(availableItems.filter((i) => i !== item));
    setInputValue("");
  };

  const handleDeleteChip = (index: number) => {
    const newSelectedItems = selectedItems.slice();
    const removedItem = newSelectedItems.splice(index, 1)[0];
    setAvailableItems([...availableItems, removedItem]);
    setSelectedItems(newSelectedItems);
  };

  const filteredItems = availableItems.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setHighlightedChip(
        (prevIndex) => (prevIndex! + 1) % selectedItems.length
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedChip(
        (prevIndex) =>
          (prevIndex! - 1 + selectedItems.length) % selectedItems.length
      );
    }
  };

  useEffect(() => {
    const dropdownElement = document.getElementById("dropdown");
    dropdownElement?.addEventListener(
      "keydown",
      handleKeyDown as unknown as EventListener
    );
    return () => {
      dropdownElement?.removeEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener
      );
    };
  }, [selectedItems.length]);

  return (
    <Container onClick={() => setHighlightedChip(null)}>
      {selectedItems.map((item, index) => (
        <Chip
          key={item}
          style={
            highlightedChip === index ? { backgroundColor: "#d0d0d0" } : {}
          }
        >
          <ProfilePic>
            <img src={data[item]} alt={item} />
          </ProfilePic>
          {item}
          <ChipCloseIcon onClick={() => handleDeleteChip(index)}>
            <MdClose size={20} color="#333" />
          </ChipCloseIcon>
        </Chip>
      ))}
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type to search"
      />
      {inputValue && (
        <Dropdown id="dropdown">
          {filteredItems.map((item) => {
            console.log(item);
            return (
              <DropdownItem key={item} onClick={() => handleItemClick(item)}>
                {item}
              </DropdownItem>
            );
          })}
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: transparent;
  /* padding: 8px; */
  border: solid #ccc;
  border-width: 0 0 1px 0;
  /* border-radius: 4px; */
  min-width: 100%;
  position: relative;
`;

const Chip = styled.div`
  padding: 0 10px 0 0;
  background-color: #e0e0e0;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const ProfilePic = styled.div`
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

const ChipCloseIcon = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 5px;
  margin: 5px;
  background: transparent;
  color: #fff;
`;

const Dropdown = styled.ul`
  position: absolute;
  /* bottom: -10rem; */
  top: 2.25rem;
  list-style: none;
  background: white;
  border: 1px solid #ccc;
  width: 100%;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default ChipComponent;
