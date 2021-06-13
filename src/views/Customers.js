import React, { useEffect, useState } from "react";
import { Card, Chip } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import RefreshIcon from '@material-ui/icons/Refresh';
import ButtonBase from '@material-ui/core/ButtonBase';
import ButtomComponent from "../components/Button";
import InputComponent from "../components/Input";
import ApiRequest from "../requests/customersApi";
import TextComponent from "../components/Text";

export const Customers = ({ history }) => {
  const apiRequest = ApiRequest();
  const [fetching, setFetching] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState(null);

  const navigateToLogs = endpointName => {
    history.push('/logs', { endpointName });
  }

  const refreshCustomers = () => {
    setFetching(true);

    apiRequest.getCustomers()
      .then(customers => {
        setCustomers(customers)
        setSearch(null)
      })
      .finally(() => setFetching(false))
  };

  const searchCustomers = searchTerm => {
    setFetching(true);

    apiRequest.searchCustomers(searchTerm)
      .then(customers => setCustomers(customers))
      .finally(() => setFetching(false))
  };

  useEffect(() => {
    return (
      refreshCustomers()
    )
  }, [])

  return (
    <div>
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
          icon={<RefreshIcon />}
          tooltip="Refresh"
          onClick={refreshCustomers}
        />
      </div>
      <div className="mt-5">
        {!fetching && customers ?
          (customers.length > 0 ?
            customers.map(customer =>
              <Card key={customer.customerId} className="d-flex mb-3">
                <ButtonBase
                  className="w-100 justify-content-between  p-3"
                  onClick={() => navigateToLogs(customer.name)}
                >
                  <TextComponent style={{ alignSelf: 'center' }}>
                    {customer.name}
                  </TextComponent>
                  <Chip
                    label={customer.email}
                    className={'bg-success'}
                  />
                </ButtonBase>
              </Card>
            ) :
            <TextComponent>
              No customers :(
            </TextComponent>
          ) :
          ['', '', '', '', '', '', '', ''].map((el, i) => <Skeleton key={i} className="rounded mb-3" animation="wave" variant="rect" height={80}></Skeleton>)
        }
      </div>
    </div>
  );
};

export default Customers;