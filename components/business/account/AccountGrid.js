import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { Card, Container, Grid, Form, Icon, Input, Menu } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
//import { Context } from "../context";
import { useRouter } from 'next/router';

export default function AccountGrid() {
    return (
        <Menu>
        <Menu.Item header>Our Company</Menu.Item>
        <Menu.Item
          name='aboutUs'
          //active={activeItem === 'aboutUs'}
          //onClick={this.handleItemClick}
        />
        <Menu.Item
          name='jobs'
          //active={activeItem === 'jobs'}
          //onClick={this.handleItemClick}
        />
        <Menu.Item
          name='locations'
          //active={activeItem === 'locations'}
          //onClick={this.handleItemClick}
        />
      </Menu>
    )
}
