import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux'
import { toggleRefresh } from '../redux/slice'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ActionDialog from './actionDialog';
import { Button, Tooltip } from '@mui/material'
import FilterDrawer from '../filters/filterDrawrer';
import * as R from 'ramda';
import { ChevronLeft, Close, SearchOutlined } from '@mui/icons-material';
import { css } from '@emotion/react';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import MyDocument from '../download/pdfDownload';


export const StyledTable = styled.table`
  width: 78%;
  border-collapse: collapse;
  text-align:center;
  margin: 20px 0;
  font-size: 18px;
`;

export const StyledTableHeader = styled.th`
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 8px;
`;

export const StyledTableRow = styled.tr`

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const StyledTableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const NavItems = styled.div`
display: flex;
flex-direction: row-reverse;
justify-content: space-between;
align-item:center;
padding: 1rem; 
background-color: #f9f9f9;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
height: 2.5rem;
& > * {
  margin-left: 1rem;
}
`;

const StyledHeading = styled.h1`
font-family: 'Arial', sans-serif; /* Specify a font family */
font-size: 24px; 
color: #f9a825; 
align-item:center;
text-transform:uppercase;
`;

const ItemList = ({ handleOpen, data, setData }) => {
  const dispatch = useDispatch();

  const itemsRedux = useSelector((state) => state.items.list)
  const refresh = useSelector((state) => state.items.refresh)

  const searchInputRef = useRef();


  const [items, setItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || []
    setItems(storedData)
    setFilteredItems(storedData)
  }, [refresh])

  function onHandleAction(e) {
    setSelectedItem(e)
    console.log("action button clicked", e);
    setDialogOpen(true);
  }

  const handleFilterChange = (newCriteria) => {

    const filtered = items.filter(item => {

      if (!newCriteria.family && !newCriteria.barat && !newCriteria.walima) {
        return true;
      }

      let includeItem = false;

      if (newCriteria.family) {
        includeItem |= item.is_Family_Invited;
      }
      if (newCriteria.barat) {
        includeItem |= item.is_Barat_Invited;
      }
      if (newCriteria.walima) {
        includeItem |= item.is_Walima_Invited;
      }

      return includeItem
    })
    setFilteredItems(filtered)
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleEdit = () => {
    setData(selectedItem);
    handleOpen();
    handleCloseDialog();
    dispatch(toggleRefresh());
  };

  const handleDelete = () => {
    const remainingData = items.filter(f => f.id !== selectedItem?.id)
    localStorage.setItem("data", JSON.stringify(remainingData))
    setItems(remainingData)
    handleCloseDialog();
    dispatch(toggleRefresh());
  };

  const onValueChange = ({ target: input }) => {
    setFilteredItems(items.filter(f => f.member_Name.toLowerCase().includes(input.value)));
  }

  const totalMembers = R.pipe(
    R.pluck('total_Members'), // Extract 'id' values from each object
    R.sum // Calculate the sum
  )(filteredItems);

  const headers = [
    { label: "Name", key: "name" },
    { label: "With Family", key: "is_Family_Invited" },
    { label: "Total Members	", key: "total_Members" },
    { label: "Event Day", key: "is_Barat_Invited" }
  ];

  const handleDownload = async () => {
    try {
      const blob = await pdf(<MyDocument data={filteredItems} totalMembers={totalMembers} />).toBlob();
      saveAs(blob, 'membersDetails.pdf');
    } catch (error) {
      console.error(error, "ERROR HERE in CONSOLE ");
    }
  };

  return (
    <>
      <NavItems>

        <Button variant="contained" onClick={handleDownload}>
          Download
        </Button>
        <StyledHeading>Wedding Guest List</StyledHeading>

        <input type="text" name="searchByText" placeholder='Search By Name' onChange={onValueChange} />

        <Button variant="contained" onClick={handleOpen}>
          Add Guest
        </Button>


      </NavItems>
      <FilterDrawer onFilterChange={handleFilterChange} />

      <StyledTable>
        <thead>
          <StyledTableRow>
            <StyledTableHeader>Name</StyledTableHeader>
            <StyledTableHeader>Is Family Allowed</StyledTableHeader>
            <StyledTableHeader>Total Members</StyledTableHeader>
            <StyledTableHeader>Event Day</StyledTableHeader>
            <StyledTableHeader>Action</StyledTableHeader>

          </StyledTableRow>
        </thead>
        <tbody>
          {filteredItems?.map((e, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{e.member_Name}</StyledTableCell>
              <StyledTableCell>{e.is_Family_Invited ? 'Yes' : 'No'}</StyledTableCell>
              <StyledTableCell>{e.total_Members}</StyledTableCell>
              <StyledTableCell> {getEventDay(e.is_Barat_Invited, e.is_Walima_Invited)}</StyledTableCell>
              <StyledTableCell > <MoreHorizIcon onClick={() => onHandleAction(e)} /></StyledTableCell>
            </StyledTableRow>
          ))}
          <tr style={{ width: "100%", border: "2px solid #f1f1f1", height: "2rem" }} >
            <td>Total Members</td>
            <div> </div>
            <td>{totalMembers}</td>
          </tr>
        </tbody>
      </StyledTable >

      {dialogOpen && <ActionDialog
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
        onClose={handleCloseDialog}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />}
    </>
  )


  function getEventDay(barat, walima) {
    if (barat & walima) return "Barat And Walima";
    if (barat & !walima) return "Barat";
    if (!barat & walima) return "Walima";
    return
  }
}
export default ItemList
