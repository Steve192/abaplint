
import {testRule} from "./_utils";
import { NoLoopInto } from "../../src/rules/loop_no_into";

const tests = [
  {abap: "LOOP AT lt_table INTO lv_variable.", cnt: 1},
  {abap: "ENDLOOP.", cnt: 0},
  {abap: "LOOP AT lt_table ASSIGNING <lv_fieldsymbol>.", cnt: 0},
  {abap: "ENDLOOP.", cnt: 0},
  {abap: "LOOP AT lt_table INTO DATA(lv_variable).", cnt: 1},
  {abap: "ENDLOOP.", cnt: 0},
  {abap: "LOOP AT lt_table ASSIGNING FIELD-SYMBOL(<lv_fieldsymbol>).", cnt: 0},
  {abap: "ENDLOOP.", cnt: 0},
 
];

testRule(tests, NoLoopInto);