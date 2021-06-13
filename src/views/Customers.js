import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ButtonBase from '@material-ui/core/ButtonBase';
import ButtomComponent from "../components/Button";
import InputComponent from "../components/Input";
import ApiRequest from "../requests/customersApi";
import TextComponent from "../components/Text";

export const Customers = () => {
  const apiRequest = ApiRequest();
  const [fetching, setFetching] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState(null);
  const [modal, setModal] = useState({
    open: false
  });

  const refreshCustomers = () => {
    setFetching(true);

    apiRequest.getCustomers()
      .then(customers => {
        setCustomers(customers)
        setSearch(null)
      })
      .finally(() => setFetching(false))
  };

  const createCustomer = customer => {
    apiRequest.createCustomer(customer)
      .then(createCustomer => {
        console.log(createCustomer)
        refreshCustomers()
        setModal({  
          open: true,
          title: 'Customer created successfully!',
          subtitle: `${createCustomer.name}, ${createCustomer.email}, ${createCustomer.customerId}`
        })
      })
  };

  const deleteCustomer = customer => {
    apiRequest.deleteCustomer(customer.customerId)
      .then(() => {
        refreshCustomers()
        setModal({  
          open: true,
          title: 'Customer deleted successfully!',
          subtitle: `${customer.name}, ${customer.email}`
        })
      })
  };

  const searchCustomers = searchTerm => {
    setFetching(true);

    apiRequest.searchCustomers(searchTerm)
      .then(customers => setCustomers(customers))
      .finally(() => setFetching(false))
  };

  const renderHeader = () => 
    <div className="d-flex align-items-center justify-content-between">
      <TextComponent type="h5">
        Customers
      </TextComponent>
      <InputComponent
        type="text"
        value={search}
        className="ml-3 mr-3"
        placeholder="Search on customers"
        onChange={event => {
          event.value ? 
            searchCustomers(event.value) :
            refreshCustomers()
        }}
        onInputChange={(event, newInputValue) => {
          setSearch(newInputValue)
        }}
      />
      <ButtomComponent
        iconButton
        icon={<AddIcon />}
        tooltip="Add customer"
        onClick={() => setModal({  
          open: true,
          title: 'Create new customer',
          form: true
        })}
      />
      <ButtomComponent
        iconButton
        icon={<RefreshIcon />}
        tooltip="Refresh"
        onClick={refreshCustomers}
      />
    </div>;

  const renderCustomersList = () => 
    <div className="mt-5">
      { fetching ?
        ['', '', '', '', '', '', '', ''].map((el, i) => <Skeleton key={i} className="rounded mb-3" animation="wave" variant="rect" height={80}></Skeleton>)
      : !customers.length ?
        <TextComponent className="text-center">
          No customers :(
        </TextComponent>
      : customers.map(customer =>
          <Card key={customer.customerId} className="d-flex mb-3">
            <ButtonBase
              className="w-100 justify-content-between p-3"
              onClick={() => setModal({  
                open: true,
                title: customer.name,
                subtitle: `${customer.email}, ${customer.customerId}`
              })}
            >
              <TextComponent style={{ alignSelf: 'center' }}>
                {customer.name}
              </TextComponent>
              <ButtomComponent
                iconButton
                icon={<DeleteIcon />}
                tooltip="Refresh"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteCustomer(customer);
                }}
              />
            </ButtonBase>
          </Card>
        )
      }
    </div>;

  const renderModal = () => 
    <Modal
      open={modal.open}
      style={{ top: 50, margin: 50 }}
      onClose={() => setModal({ open: false })}
      closeAfterTransition
      BackdropComponent={Backdrop}
      className="bg-blue"
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={modal.open}>
        <div style={{
          padding: 30,
          borderRadius: 10,
          backgroundColor: 'white'
        }}>
          <h2>{ modal.title }</h2>
          { modal.subtitle ? 
              <p className="mt-3">{ modal.subtitle }</p> :
            modal.form ? 
              <div className="mt-5">
                <InputComponent
                  type="text"
                  value={modal.name}
                  placeholder="Name"
                  onChange={event => 
                    setModal(prevValue => {
                      return { 
                        ...prevValue,
                        name: event.value
                      }
                    })
                  }
                />
                <InputComponent
                  type="text"
                  value={search}
                  className="mt-1"
                  placeholder="E-mail"
                  onChange={event => 
                    setModal(prevValue => {
                      return { 
                        ...prevValue,
                        email: event.value
                      }
                    })
                  }
                />
                <ButtomComponent
                  color="primary"
                  className="mt-5"
                  tooltip="Add customer"
                  onClick={() => modal.name && modal.email
                    && modal.name.length > 3 
                    && modal.email.includes('@') 
                    ? createCustomer({
                      name: modal.name,
                      email: modal.email
                    })
                    : setModal({ 
                        open: true,
                        title: 'Invalid input',
                        subtitle: 'Name must be at least 3 caracters and e-mail must contain "@"'
                    })
                  }
                >
                  Add
                </ButtomComponent>
              </div> : undefined
          }
        </div>
      </Fade>
    </Modal>;

  useEffect(() => {
    return (
      refreshCustomers()
    )
  }, [])

  return (
    <div>
      { renderHeader() }
      { renderCustomersList() }
      { renderModal() }
    </div>
  );
};

export default Customers;