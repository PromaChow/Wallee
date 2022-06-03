import React, {useState} from 'react';
import {
  Modal,
  Input,
  FormControl,
  Button,
  Radio,
  Box,
  Center,
} from 'native-base';
import {IncomeJournal, ExpenseJournal, Journal} from '../journal';
import listOfJournals, {listOfBudgets} from '../userSpace';
import {journalKeyMemo, getRandomColor} from '../../App';
import {Budget} from '../budget';
