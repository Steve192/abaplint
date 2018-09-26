import {statementType, statementVersion} from "../utils";
import * as Statements from "../../src/abap/statements/";
import {Version} from "../../src/version";

let tests = [
  "move 2 to lv_foo.",
  "move exact c_val to l_int.",
  "MOVE foo ?TO bar.",
  "MOVE '2' TO %bar.",
  "lv_foo = 2.",
  "rs_data-raw = gv_out.",
  "rv_bool = boolc( sy-subrc = 0 ).",
  "rs_data-compressed_len = xstrlen( foo ).",
  "lo_repo ?= lcl_app=>repo_srv( )->get( <ls_list>-key ).",
  "foo ?= lo_obj->/iwbep/if_mgw_dp_int_facade~get_model( ).",
  "wa_asdf-cur = sy-tabix * ( -1 ).",
  "lv_test = ( lv_seconds / 3600 ) DIV 24.",
  "move asdf to foobar(3).",
  "lv_sdf = lv_dfd BIT-XOR lv_hex.",
  "foo = 'sdf' & 'sdf'.",
  "lv_foo = 'something'(002).",
  "lv_foo = 'foobar'(bl1).",
  "rs_data-len = xstrlen( foo ) - 2.",
  "rs_data-len = xstrlen( foo ) - field.",
  "lv_maxint = 2 ** 31 - 1.",
  "lv_moo = |foo \\| bar|.",
  "rs_data-len = xstrlen( foo ) - foo( ).",
  "iv_f = - lv_maxint.",
  "rs_data-len = xstrlen( foo ) - go_stream->rema( ).",
  "foo = method( 2 ).",
  "foo = method(\n 2 ).",
  "rv_res = BIT-NOT iv_x.",
  "rv_res = ( iv_x BIT-AND iv_y ) BIT-OR ( ( BIT-NOT iv_x ) BIT-AND iv_z ).",
  "rv_res = ( iv_x BIT-AND iv_y ) BIT-OR ( iv_x BIT-AND iv_z ).",
  "foo = method(\n2 ).",
  "index1 = index2 = index1 - 1.",
  "move-corresponding ls_usbapilink to lr_usbapilink_cd->*.",
  "MOVE-CORRESPONDING bar TO bar KEEPING TARGET LINES.",
  "lv_chunk = iv_line+<match>-offset.",
  "lv_chunk = iv_line(<match>-length).",
  "lv_chunk = iv_line+<match>-offset(<match>-length).",
  "ls_/foo/bar-visible = 'X'.",
  "lv_type = mr_property->*-data-type.",
  "lr_ref->*-length = ls_type-length.",
  "x = column - '0.5'.",
  "e_flag-4 = 'X'.",

  "lv_foo = `foo` & `foo` & `foo` & `foo` & `foo` & `foo` & \n" +
    "`foo` & `foo` & `foo` & `foo` & `foo` & `foo` & `foo` & \n" +
    "`foo` & `foo` & `foo` & `foo` & `foo` & `foo` & `foo` & \n" +
    "`foo` & `foo` & `foo` & `foo` & `foo` & `foo` & `foo` & \n" +
    "`foo` & `foo` & `foo` & `foo` & `foo`.",

  "lv_foo = 'bar' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' &&\n" +
  "  'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo' && 'foo'.",
];

statementType(tests, "MOVE", Statements.Move);

let versions = [
  {abap: "lo_foo = |hello|.", ver: Version.v702},
  {abap: "lo_foo = NEW zcl_class( ).", ver: Version.v740sp02},
  {abap: "lo_obj = CAST cl_abap_objectdescr( cl_abap_objectdescr=>describe_by_object_ref( ii_handler ) ).", ver: Version.v740sp02},
  {abap: "DATA(lo_obj) = CAST cl_abap_objectdescr(\n cl_abap_objectdescr=>describe_by_object_ref( ii_handler ) ).", ver: Version.v740sp02},
  {abap: "foo = CORRESPONDING #( get( ) ).", ver: Version.v740sp05},
  {abap: "lv_commit = CONV #( iv_branch ).", ver: Version.v740sp02},
  {abap: "lv_value = REF #( attribute_value ).", ver: Version.v740sp02},
  {abap: "ev_filename = mt_files[ 1 ]-key-obj_name.", ver: Version.v740sp02},
  {abap: "DATA(new_level) = VALUE #( mt_levels[ random_int ] OPTIONAL ).", ver: Version.v740sp08},
  {abap: "land_text = countries[ land1 = lv_foo ]-landx50.", ver: Version.v740sp02},
  {abap: "DATA(lt_tkey) = VALUE cvt_selops( ( option = 'EQ' sign   = 'I' low    = 'sdf' ) ).", ver: Version.v740sp02},
  {abap: "lv_xstr = CAST cl_sxml_string_writer( li_writer )->get_output( ).", ver: Version.v740sp02},
  {abap: "lv_value = COND #( WHEN type_kind = 'r' THEN 's' WHEN type_kind = 'h' THEN 'b' ELSE 'sd' ).", ver: Version.v740sp02},
  {abap: "lv_commit = lo_repo->get_branch( CONV #( iv_branch ) )->get_data( )-sha1.", ver: Version.v740sp02},
  {abap: "foo = gt_det[ <lv_row> ].", ver: Version.v740sp02},
  {abap: "foo = li_foo->create( VALUE #( ) ).", ver: Version.v740sp02},
  {abap: "foo = mi_foo->update( CORRESPONDING #( get( ) EXCEPT field ) ).", ver: Version.v740sp05},
  {abap: "foo = VALUE /bobf/t_frw_name( ).", ver: Version.v740sp02},
  {abap: "foo = switch #( i_popup when abap_true then c_popup when abap_false then c_full ).", ver: Version.v740sp02},
  {abap: "_locale = SWITCH #( i_locale WHEN `` THEN get_locale( ) ELSE i_locale ).", ver: Version.v740sp02},
  {abap: "r_source = VALUE #( BASE r_source ( source_line ) ).", ver: Version.v740sp02},
  {abap: "foo = VALUE #( ( col1 = 13 col2 = 232 col3 = 332 ) ).", ver: Version.v740sp02},
  {abap: "excluded = value #( ( b_01 ) ).", ver: Version.v740sp02},
  {abap: "excluded = value #( ( foo = b_01 ) ( bar = b_02 ) ).", ver: Version.v740sp02},
  {abap: "excluded = value #( ( b_01 ) ( b_02 ) ).", ver: Version.v740sp02},
  {abap: "DATA(lt_tadir) = VALUE tt_tadir( FOR ls_object IN it_objects (\n" +
    "pgmid = ls_object-pgmid\n" +
    "object = ls_object-object\n" +
    "obj_name = ls_object-obj_name ) ).", ver: Version.v740sp05},
  {abap: "foo = VALUE #(\n" +
    "( col1 = 11 col2 = 211 col3 = 311 )\n" +
    "( col1 = 11 col2 = 212 col3 = 312 )\n" +
    "( col1 = 12 col2 = 221 col3 = 321 )\n" +
    "( col1 = 12 col2 = 222 col3 = 322 )\n" +
    "( col1 = 13 col2 = 231 col3 = 331 )\n" +
    "( col1 = 13 col2 = 232 col3 = 332 ) ).", ver: Version.v740sp02},
  {abap: "moo = VALUE #(\n" +
    "FOR j = 1 THEN i + 1 WHILE j <= i_cols (\n" +
    "row = i\n" +
    "col = j ) ).", ver: Version.v740sp05},
  {abap: "r_grid->grid_cells = VALUE #(\n" +
    "FOR i = 1 THEN i + 1 WHILE i <= i_rows\n" +
    "FOR j = 1 THEN j + 1 WHILE j <= i_cols (\n" +
    "row = i\n" +
    "col = j ) ).", ver: Version.v740sp05},
  {abap: "r_cells_alive = lines( FILTER #( cells USING KEY key_alive WHERE alive = abap_true ) ).", ver: Version.v740sp08},
  {abap: "foo = CORRESPONDING #( <ls_data> MAPPING country = coun currency = curr ).", ver: Version.v740sp05},
  {abap: "ct_usage[ id = c_excel ]-enabled = abap_false.", ver: Version.v740sp02},
  {abap: "ct_usage[ KEY name id = c_excel ]-enabled = abap_false.", ver: Version.v740sp02},
  {abap: "e_object->mt_toolbar[ function = <tb>-function ]-disabled = abap_true.", ver: Version.v740sp02},
  {abap: "ro_elem = VALUE #( char_table[ char = lv_char ]-elem DEFAULT NEW lcl_lisp_char( lv_char ) ).", ver: Version.v740sp08},
  {abap: "color = VALUE #( ( color-col = color_on ) ).", ver: Version.v740sp02},
  {abap: "foo = VALUE #( ( ) ).", ver: Version.v740sp02},
  {abap: "DATA(message) = COND #( LET len = strlen( i_message ) IN WHEN len > 0 THEN 'sdf' ).", ver: Version.v740sp02},
  {abap: "r_list = VALUE #( FOR <attribute> IN sdf->attributes ( <attribute>-name ) ).", ver: Version.v740sp05},
  {abap: "thesum = thesum + me->matrix[ x ] * i_matrix->matrix[ j ].", ver: Version.v740sp02},
  {abap: "thesum = thesum + me->matrix[ x ][ j ] * i_matrix->matrix[ j ][ y ].", ver: Version.v740sp02},
  {abap: "foo = CONV decfloat16( _num_samples ).", ver: Version.v740sp02},
  {abap: "t->matrix[ 1 ][ 4 ] = i_rotate_about_line->x.", ver: Version.v740sp02},
  {abap: "DATA(asdf) = VALUE zfoo(\n" +
    "FOR ls_sdf IN  lt_sdf WHERE ( classtype = '001' AND classnum = 'SOMETHING' )\n" +
    "( ls_sdf ) ).", ver: Version.v740sp05},
];

statementVersion(versions, "MOVE", Statements.Move);