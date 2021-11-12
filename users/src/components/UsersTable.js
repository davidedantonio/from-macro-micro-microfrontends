import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import {Search} from "@material-ui/icons";
import {Table, TableHead, TableRow, TableCell, TableBody, IconButton, Container, Paper} from "@material-ui/core";
import UserInfo from "./UserInfo";
import AddUser from "./AddUser";

const UsersTable = ({
  store,
  appShellStore
}) => {
  
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      appShellStore.changeTitle("Users");
      await store.loadUsers();
      
      appShellStore.showMessage({
        variant: 'success',
        message: 'Users list loaded!'
      })
    } catch (e) {
      appShellStore.showMessage({
        variant: 'error',
        message: e.message
      })
    }
  }

  return (
    <Container maxWidth={'md'}>
      <Paper>
        <Table style={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Full Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.rows.map(item => {
              return (
                <TableRow key={item._id}>
                  <TableCell>
                    <IconButton
                      onClick={() => store.getUserInfo(item._id)}>
                      <Search />
                    </IconButton>
                  </TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.fullName}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>

      <UserInfo />
      <AddUser />
    </Container>
  )
}

export default inject('store', 'appShellStore')(observer(UsersTable));