/*
All clafers: 90 | Abstract: 2 | Concrete: 88 | References: 0
Constraints: 89
Goals: 1
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_IMeasurable
{ r_c2_footprint : one c2_footprint }

sig c2_footprint
{ c2_footprint_ref : one Int }
{ one @r_c2_footprint.this }

abstract sig c3_SQLite
{ r_c4_OperatingSystemCharacteristics : one c4_OperatingSystemCharacteristics
, r_c64_EnableFeatures : one c64_EnableFeatures
, r_c156_DisableFeatures : one c156_DisableFeatures
, r_c174_OmitFeatures : one c174_OmitFeatures
, r_c554_SQLITE_DEBUG : lone c554_SQLITE_DEBUG
, r_c560_SQLITE_MEMDEBUG : lone c560_SQLITE_MEMDEBUG
, r_c566_total_footprint : one c566_total_footprint }

sig c4_OperatingSystemCharacteristics extends c1_IMeasurable
{ r_c10_SQLITE_4_BYTE_ALIGNED_MALLOC : one c10_SQLITE_4_BYTE_ALIGNED_MALLOC
, r_c16_SQLITE_CASE_SENSITIVE_LIKE : lone c16_SQLITE_CASE_SENSITIVE_LIKE
, r_c22_SQLITE_HAVE_ISNAN : lone c22_SQLITE_HAVE_ISNAN
, r_c28_SQLITE_SECURE_DELETE : lone c28_SQLITE_SECURE_DELETE
, r_c34_ChooseSQLITE_TEMP_STORE : lone c34_ChooseSQLITE_TEMP_STORE }
{ one @r_c4_OperatingSystemCharacteristics.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 888 }

sig c10_SQLITE_4_BYTE_ALIGNED_MALLOC extends c1_IMeasurable
{}
{ one @r_c10_SQLITE_4_BYTE_ALIGNED_MALLOC.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c16_SQLITE_CASE_SENSITIVE_LIKE extends c1_IMeasurable
{}
{ one @r_c16_SQLITE_CASE_SENSITIVE_LIKE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c22_SQLITE_HAVE_ISNAN extends c1_IMeasurable
{}
{ one @r_c22_SQLITE_HAVE_ISNAN.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c28_SQLITE_SECURE_DELETE extends c1_IMeasurable
{}
{ one @r_c28_SQLITE_SECURE_DELETE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c34_ChooseSQLITE_TEMP_STORE extends c1_IMeasurable
{ r_c40_SQLITE_TEMP_STORE_EQ_0 : lone c40_SQLITE_TEMP_STORE_EQ_0
, r_c46_SQLITE_TEMP_STORE_EQ_1 : lone c46_SQLITE_TEMP_STORE_EQ_1
, r_c52_SQLITE_TEMP_STORE_EQ_2 : lone c52_SQLITE_TEMP_STORE_EQ_2
, r_c58_SQLITE_TEMP_STORE_EQ_3 : lone c58_SQLITE_TEMP_STORE_EQ_3 }
{ one @r_c34_ChooseSQLITE_TEMP_STORE.this
  let children = (r_c40_SQLITE_TEMP_STORE_EQ_0 + r_c46_SQLITE_TEMP_STORE_EQ_1 + r_c52_SQLITE_TEMP_STORE_EQ_2 + r_c58_SQLITE_TEMP_STORE_EQ_3) | one children
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c40_SQLITE_TEMP_STORE_EQ_0 extends c1_IMeasurable
{}
{ one @r_c40_SQLITE_TEMP_STORE_EQ_0.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c46_SQLITE_TEMP_STORE_EQ_1 extends c1_IMeasurable
{}
{ one @r_c46_SQLITE_TEMP_STORE_EQ_1.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c52_SQLITE_TEMP_STORE_EQ_2 extends c1_IMeasurable
{}
{ one @r_c52_SQLITE_TEMP_STORE_EQ_2.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c58_SQLITE_TEMP_STORE_EQ_3 extends c1_IMeasurable
{}
{ one @r_c58_SQLITE_TEMP_STORE_EQ_3.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c64_EnableFeatures extends c1_IMeasurable
{ r_c70_SQLITE_ENABLE_ATOMIC_WRITE : lone c70_SQLITE_ENABLE_ATOMIC_WRITE
, r_c76_SQLITE_ENABLE_COLUMN_METADATA : lone c76_SQLITE_ENABLE_COLUMN_METADATA
, r_c84_SQLITE_ENABLE_FTS3 : lone c84_SQLITE_ENABLE_FTS3
, r_c90_SQLITE_ENABLE_FTS3_PARENTHESIS : lone c90_SQLITE_ENABLE_FTS3_PARENTHESIS
, r_c96_SQLITE_ENABLE_MEMORY_MANAGEMENT : lone c96_SQLITE_ENABLE_MEMORY_MANAGEMENT
, r_c102_ChooseMemSys : lone c102_ChooseMemSys
, r_c120_SQLITE_ENABLE_RTREE : lone c120_SQLITE_ENABLE_RTREE
, r_c126_SQLITE_ENABLE_STAT2 : lone c126_SQLITE_ENABLE_STAT2
, r_c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT : lone c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT
, r_c138_SQLITE_ENABLE_UNLOCK_NOTIFY : lone c138_SQLITE_ENABLE_UNLOCK_NOTIFY
, r_c144_SQLITE_SOUNDEX : lone c144_SQLITE_SOUNDEX
, r_c150_YYTRACKMAXSTACKDEPTH : lone c150_YYTRACKMAXSTACKDEPTH }
{ one @r_c64_EnableFeatures.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c70_SQLITE_ENABLE_ATOMIC_WRITE extends c1_IMeasurable
{}
{ one @r_c70_SQLITE_ENABLE_ATOMIC_WRITE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3 }

sig c76_SQLITE_ENABLE_COLUMN_METADATA extends c1_IMeasurable
{}
{ one @r_c76_SQLITE_ENABLE_COLUMN_METADATA.this
  no (((this.~@r_c76_SQLITE_ENABLE_COLUMN_METADATA).~@r_c64_EnableFeatures).@r_c174_OmitFeatures).@r_c310_SQLITE_OMIT_DECLTYPE
  (this.@r_c2_footprint.@c2_footprint_ref) = 2 }

sig c84_SQLITE_ENABLE_FTS3 extends c1_IMeasurable
{}
{ one @r_c84_SQLITE_ENABLE_FTS3.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 100 }

sig c90_SQLITE_ENABLE_FTS3_PARENTHESIS extends c1_IMeasurable
{}
{ one @r_c90_SQLITE_ENABLE_FTS3_PARENTHESIS.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c96_SQLITE_ENABLE_MEMORY_MANAGEMENT extends c1_IMeasurable
{}
{ one @r_c96_SQLITE_ENABLE_MEMORY_MANAGEMENT.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 1 }

sig c102_ChooseMemSys extends c1_IMeasurable
{ r_c108_SQLITE_ENABLE_MEMSYS3 : lone c108_SQLITE_ENABLE_MEMSYS3
, r_c114_SQLITE_ENABLE_MEMSYS5 : lone c114_SQLITE_ENABLE_MEMSYS5 }
{ one @r_c102_ChooseMemSys.this
  let children = (r_c108_SQLITE_ENABLE_MEMSYS3 + r_c114_SQLITE_ENABLE_MEMSYS5) | one children
  (this.@r_c2_footprint.@c2_footprint_ref) = 3 }

sig c108_SQLITE_ENABLE_MEMSYS3 extends c1_IMeasurable
{}
{ one @r_c108_SQLITE_ENABLE_MEMSYS3.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 2 }

sig c114_SQLITE_ENABLE_MEMSYS5 extends c1_IMeasurable
{}
{ one @r_c114_SQLITE_ENABLE_MEMSYS5.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c120_SQLITE_ENABLE_RTREE extends c1_IMeasurable
{}
{ one @r_c120_SQLITE_ENABLE_RTREE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 33 }

sig c126_SQLITE_ENABLE_STAT2 extends c1_IMeasurable
{}
{ one @r_c126_SQLITE_ENABLE_STAT2.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 4 }

sig c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT extends c1_IMeasurable
{}
{ one @r_c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 1 }

sig c138_SQLITE_ENABLE_UNLOCK_NOTIFY extends c1_IMeasurable
{}
{ one @r_c138_SQLITE_ENABLE_UNLOCK_NOTIFY.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3 }

sig c144_SQLITE_SOUNDEX extends c1_IMeasurable
{}
{ one @r_c144_SQLITE_SOUNDEX.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 1 }

sig c150_YYTRACKMAXSTACKDEPTH extends c1_IMeasurable
{}
{ one @r_c150_YYTRACKMAXSTACKDEPTH.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c156_DisableFeatures extends c1_IMeasurable
{ r_c162_SQLITE_DISABLE_LFS : lone c162_SQLITE_DISABLE_LFS
, r_c168_SQLITE_DISABLE_DIRSYNC : lone c168_SQLITE_DISABLE_DIRSYNC }
{ one @r_c156_DisableFeatures.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c162_SQLITE_DISABLE_LFS extends c1_IMeasurable
{}
{ one @r_c162_SQLITE_DISABLE_LFS.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c168_SQLITE_DISABLE_DIRSYNC extends c1_IMeasurable
{}
{ one @r_c168_SQLITE_DISABLE_DIRSYNC.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c174_OmitFeatures extends c1_IMeasurable
{ r_c180_SQLITE_OMIT_ALTERTABLE : lone c180_SQLITE_OMIT_ALTERTABLE
, r_c187_SQLITE_OMIT_ANALYZE : lone c187_SQLITE_OMIT_ANALYZE
, r_c194_SQLITE_OMIT_ATTACH : lone c194_SQLITE_OMIT_ATTACH
, r_c201_SQLITE_OMIT_AUTHORIZATION : lone c201_SQLITE_OMIT_AUTHORIZATION
, r_c208_SQLITE_OMIT_AUTOINCREMENT : lone c208_SQLITE_OMIT_AUTOINCREMENT
, r_c215_SQLITE_OMIT_AUTOMATIC_INDEX : lone c215_SQLITE_OMIT_AUTOMATIC_INDEX
, r_c222_SQLITE_OMIT_AUTOINIT : lone c222_SQLITE_OMIT_AUTOINIT
, r_c228_SQLITE_OMIT_AUTOVACUUM : lone c228_SQLITE_OMIT_AUTOVACUUM
, r_c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION : lone c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION
, r_c241_SQLITE_OMIT_BLOB_LITERAL : lone c241_SQLITE_OMIT_BLOB_LITERAL
, r_c248_SQLITE_OMIT_BTREECOUNT : lone c248_SQLITE_OMIT_BTREECOUNT
, r_c255_SQLITE_OMIT_BUILTIN_TEST : lone c255_SQLITE_OMIT_BUILTIN_TEST
, r_c262_SQLITE_OMIT_CAST : lone c262_SQLITE_OMIT_CAST
, r_c269_SQLITE_OMIT_CHECK : lone c269_SQLITE_OMIT_CHECK
, r_c276_SQLITE_OMIT_COMPILEOPTION_DIAGS : lone c276_SQLITE_OMIT_COMPILEOPTION_DIAGS
, r_c283_SQLITE_OMIT_COMPLETE : lone c283_SQLITE_OMIT_COMPLETE
, r_c290_SQLITE_OMIT_COMPOUND_SELECT : lone c290_SQLITE_OMIT_COMPOUND_SELECT
, r_c297_SQLITE_OMIT_CONFLICT_CLAUSE : lone c297_SQLITE_OMIT_CONFLICT_CLAUSE
, r_c303_SQLITE_OMIT_DATETIME_FUNCS : lone c303_SQLITE_OMIT_DATETIME_FUNCS
, r_c310_SQLITE_OMIT_DECLTYPE : lone c310_SQLITE_OMIT_DECLTYPE
, r_c319_SQLITE_OMIT_DEPRECATED : lone c319_SQLITE_OMIT_DEPRECATED
, r_c326_SQLITE_OMIT_EXPLAIN : lone c326_SQLITE_OMIT_EXPLAIN
, r_c333_SQLITE_OMIT_FLAG_PRAGMAS : lone c333_SQLITE_OMIT_FLAG_PRAGMAS
, r_c340_SQLITE_OMIT_FLOATING_POINT : lone c340_SQLITE_OMIT_FLOATING_POINT
, r_c347_SQLITE_OMIT_FOREIGN_KEY : lone c347_SQLITE_OMIT_FOREIGN_KEY
, r_c354_SQLITE_OMIT_GET_TABLE : lone c354_SQLITE_OMIT_GET_TABLE
, r_c361_SQLITE_OMIT_INCRBLOB : lone c361_SQLITE_OMIT_INCRBLOB
, r_c368_SQLITE_OMIT_INTEGRITY_CHECK : lone c368_SQLITE_OMIT_INTEGRITY_CHECK
, r_c375_SQLITE_OMIT_LIKE_OPTIMIZATION : lone c375_SQLITE_OMIT_LIKE_OPTIMIZATION
, r_c382_SQLITE_OMIT_LOAD_EXTENSION : lone c382_SQLITE_OMIT_LOAD_EXTENSION
, r_c389_SQLITE_OMIT_LOCALTIME : lone c389_SQLITE_OMIT_LOCALTIME
, r_c396_SQLITE_OMIT_LOOKASIDE : lone c396_SQLITE_OMIT_LOOKASIDE
, r_c403_SQLITE_OMIT_MEMORYDB : lone c403_SQLITE_OMIT_MEMORYDB
, r_c410_SQLITE_OMIT_OR_OPTIMIZATION : lone c410_SQLITE_OMIT_OR_OPTIMIZATION
, r_c417_SQLITE_OMIT_PAGER_PRAGMAS : lone c417_SQLITE_OMIT_PAGER_PRAGMAS
, r_c424_SQLITE_OMIT_PRAGMA : lone c424_SQLITE_OMIT_PRAGMA
, r_c431_SQLITE_OMIT_PROGRESS_CALLBACK : lone c431_SQLITE_OMIT_PROGRESS_CALLBACK
, r_c438_SQLITE_OMIT_QUICKBALANCE : lone c438_SQLITE_OMIT_QUICKBALANCE
, r_c445_SQLITE_OMIT_REINDEX : lone c445_SQLITE_OMIT_REINDEX
, r_c452_SQLITE_OMIT_SCHEMA_PRAGMAS : lone c452_SQLITE_OMIT_SCHEMA_PRAGMAS
, r_c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS : lone c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS
, r_c466_SQLITE_OMIT_SHARED_CACHE : lone c466_SQLITE_OMIT_SHARED_CACHE
, r_c473_SQLITE_OMIT_SUBQUERY : lone c473_SQLITE_OMIT_SUBQUERY
, r_c480_SQLITE_OMIT_TCL_VARIABLE : lone c480_SQLITE_OMIT_TCL_VARIABLE
, r_c486_SQLITE_OMIT_TEMPDB : lone c486_SQLITE_OMIT_TEMPDB
, r_c492_SQLITE_OMIT_TRACE : lone c492_SQLITE_OMIT_TRACE
, r_c499_SQLITE_OMIT_TRIGGER : lone c499_SQLITE_OMIT_TRIGGER
, r_c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION : lone c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION
, r_c512_SQLITE_OMIT_UTF16 : lone c512_SQLITE_OMIT_UTF16
, r_c519_SQLITE_OMIT_VACUUM : lone c519_SQLITE_OMIT_VACUUM
, r_c526_SQLITE_OMIT_VIEW : lone c526_SQLITE_OMIT_VIEW
, r_c533_SQLITE_OMIT_VIRTUALTABLE : lone c533_SQLITE_OMIT_VIRTUALTABLE
, r_c540_SQLITE_OMIT_WAL : lone c540_SQLITE_OMIT_WAL
, r_c547_SQLITE_OMIT_XFER_OPT : lone c547_SQLITE_OMIT_XFER_OPT }
{ one @r_c174_OmitFeatures.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c180_SQLITE_OMIT_ALTERTABLE extends c1_IMeasurable
{}
{ one @r_c180_SQLITE_OMIT_ALTERTABLE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-7) }

sig c187_SQLITE_OMIT_ANALYZE extends c1_IMeasurable
{}
{ one @r_c187_SQLITE_OMIT_ANALYZE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-5) }

sig c194_SQLITE_OMIT_ATTACH extends c1_IMeasurable
{}
{ one @r_c194_SQLITE_OMIT_ATTACH.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-8) }

sig c201_SQLITE_OMIT_AUTHORIZATION extends c1_IMeasurable
{}
{ one @r_c201_SQLITE_OMIT_AUTHORIZATION.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-5) }

sig c208_SQLITE_OMIT_AUTOINCREMENT extends c1_IMeasurable
{}
{ one @r_c208_SQLITE_OMIT_AUTOINCREMENT.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-3) }

sig c215_SQLITE_OMIT_AUTOMATIC_INDEX extends c1_IMeasurable
{}
{ one @r_c215_SQLITE_OMIT_AUTOMATIC_INDEX.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-4) }

sig c222_SQLITE_OMIT_AUTOINIT extends c1_IMeasurable
{}
{ one @r_c222_SQLITE_OMIT_AUTOINIT.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c228_SQLITE_OMIT_AUTOVACUUM extends c1_IMeasurable
{}
{ one @r_c228_SQLITE_OMIT_AUTOVACUUM.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-14) }

sig c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION extends c1_IMeasurable
{}
{ one @r_c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c241_SQLITE_OMIT_BLOB_LITERAL extends c1_IMeasurable
{}
{ one @r_c241_SQLITE_OMIT_BLOB_LITERAL.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c248_SQLITE_OMIT_BTREECOUNT extends c1_IMeasurable
{}
{ one @r_c248_SQLITE_OMIT_BTREECOUNT.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-2) }

sig c255_SQLITE_OMIT_BUILTIN_TEST extends c1_IMeasurable
{}
{ one @r_c255_SQLITE_OMIT_BUILTIN_TEST.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-2) }

sig c262_SQLITE_OMIT_CAST extends c1_IMeasurable
{}
{ one @r_c262_SQLITE_OMIT_CAST.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c269_SQLITE_OMIT_CHECK extends c1_IMeasurable
{}
{ one @r_c269_SQLITE_OMIT_CHECK.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c276_SQLITE_OMIT_COMPILEOPTION_DIAGS extends c1_IMeasurable
{}
{ one @r_c276_SQLITE_OMIT_COMPILEOPTION_DIAGS.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c283_SQLITE_OMIT_COMPLETE extends c1_IMeasurable
{}
{ one @r_c283_SQLITE_OMIT_COMPLETE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-888) }

sig c290_SQLITE_OMIT_COMPOUND_SELECT extends c1_IMeasurable
{}
{ one @r_c290_SQLITE_OMIT_COMPOUND_SELECT.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-10) }

sig c297_SQLITE_OMIT_CONFLICT_CLAUSE extends c1_IMeasurable
{}
{ one @r_c297_SQLITE_OMIT_CONFLICT_CLAUSE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c303_SQLITE_OMIT_DATETIME_FUNCS extends c1_IMeasurable
{}
{ one @r_c303_SQLITE_OMIT_DATETIME_FUNCS.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-10) }

sig c310_SQLITE_OMIT_DECLTYPE extends c1_IMeasurable
{}
{ one @r_c310_SQLITE_OMIT_DECLTYPE.this
  no (((this.~@r_c310_SQLITE_OMIT_DECLTYPE).~@r_c174_OmitFeatures).@r_c64_EnableFeatures).@r_c76_SQLITE_ENABLE_COLUMN_METADATA
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c319_SQLITE_OMIT_DEPRECATED extends c1_IMeasurable
{}
{ one @r_c319_SQLITE_OMIT_DEPRECATED.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c326_SQLITE_OMIT_EXPLAIN extends c1_IMeasurable
{}
{ one @r_c326_SQLITE_OMIT_EXPLAIN.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-10) }

sig c333_SQLITE_OMIT_FLAG_PRAGMAS extends c1_IMeasurable
{}
{ one @r_c333_SQLITE_OMIT_FLAG_PRAGMAS.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c340_SQLITE_OMIT_FLOATING_POINT extends c1_IMeasurable
{}
{ one @r_c340_SQLITE_OMIT_FLOATING_POINT.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-18) }

sig c347_SQLITE_OMIT_FOREIGN_KEY extends c1_IMeasurable
{}
{ one @r_c347_SQLITE_OMIT_FOREIGN_KEY.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-15) }

sig c354_SQLITE_OMIT_GET_TABLE extends c1_IMeasurable
{}
{ one @r_c354_SQLITE_OMIT_GET_TABLE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-3) }

sig c361_SQLITE_OMIT_INCRBLOB extends c1_IMeasurable
{}
{ one @r_c361_SQLITE_OMIT_INCRBLOB.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-7) }

sig c368_SQLITE_OMIT_INTEGRITY_CHECK extends c1_IMeasurable
{}
{ one @r_c368_SQLITE_OMIT_INTEGRITY_CHECK.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-9) }

sig c375_SQLITE_OMIT_LIKE_OPTIMIZATION extends c1_IMeasurable
{}
{ one @r_c375_SQLITE_OMIT_LIKE_OPTIMIZATION.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-2) }

sig c382_SQLITE_OMIT_LOAD_EXTENSION extends c1_IMeasurable
{}
{ one @r_c382_SQLITE_OMIT_LOAD_EXTENSION.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-3) }

sig c389_SQLITE_OMIT_LOCALTIME extends c1_IMeasurable
{}
{ one @r_c389_SQLITE_OMIT_LOCALTIME.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c396_SQLITE_OMIT_LOOKASIDE extends c1_IMeasurable
{}
{ one @r_c396_SQLITE_OMIT_LOOKASIDE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c403_SQLITE_OMIT_MEMORYDB extends c1_IMeasurable
{}
{ one @r_c403_SQLITE_OMIT_MEMORYDB.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-2) }

sig c410_SQLITE_OMIT_OR_OPTIMIZATION extends c1_IMeasurable
{}
{ one @r_c410_SQLITE_OMIT_OR_OPTIMIZATION.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-5) }

sig c417_SQLITE_OMIT_PAGER_PRAGMAS extends c1_IMeasurable
{}
{ one @r_c417_SQLITE_OMIT_PAGER_PRAGMAS.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-5) }

sig c424_SQLITE_OMIT_PRAGMA extends c1_IMeasurable
{}
{ one @r_c424_SQLITE_OMIT_PRAGMA.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-16) }

sig c431_SQLITE_OMIT_PROGRESS_CALLBACK extends c1_IMeasurable
{}
{ one @r_c431_SQLITE_OMIT_PROGRESS_CALLBACK.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c438_SQLITE_OMIT_QUICKBALANCE extends c1_IMeasurable
{}
{ one @r_c438_SQLITE_OMIT_QUICKBALANCE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c445_SQLITE_OMIT_REINDEX extends c1_IMeasurable
{}
{ one @r_c445_SQLITE_OMIT_REINDEX.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c452_SQLITE_OMIT_SCHEMA_PRAGMAS extends c1_IMeasurable
{}
{ one @r_c452_SQLITE_OMIT_SCHEMA_PRAGMAS.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-2) }

sig c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS extends c1_IMeasurable
{}
{ one @r_c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-1) }

sig c466_SQLITE_OMIT_SHARED_CACHE extends c1_IMeasurable
{}
{ one @r_c466_SQLITE_OMIT_SHARED_CACHE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-10) }

sig c473_SQLITE_OMIT_SUBQUERY extends c1_IMeasurable
{}
{ one @r_c473_SQLITE_OMIT_SUBQUERY.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-11) }

sig c480_SQLITE_OMIT_TCL_VARIABLE extends c1_IMeasurable
{}
{ one @r_c480_SQLITE_OMIT_TCL_VARIABLE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c486_SQLITE_OMIT_TEMPDB extends c1_IMeasurable
{}
{ one @r_c486_SQLITE_OMIT_TEMPDB.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c492_SQLITE_OMIT_TRACE extends c1_IMeasurable
{}
{ one @r_c492_SQLITE_OMIT_TRACE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-3) }

sig c499_SQLITE_OMIT_TRIGGER extends c1_IMeasurable
{}
{ one @r_c499_SQLITE_OMIT_TRIGGER.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-27) }

sig c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION extends c1_IMeasurable
{}
{ one @r_c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c512_SQLITE_OMIT_UTF16 extends c1_IMeasurable
{}
{ one @r_c512_SQLITE_OMIT_UTF16.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-8) }

sig c519_SQLITE_OMIT_VACUUM extends c1_IMeasurable
{}
{ one @r_c519_SQLITE_OMIT_VACUUM.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-4) }

sig c526_SQLITE_OMIT_VIEW extends c1_IMeasurable
{}
{ one @r_c526_SQLITE_OMIT_VIEW.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-3) }

sig c533_SQLITE_OMIT_VIRTUALTABLE extends c1_IMeasurable
{}
{ one @r_c533_SQLITE_OMIT_VIRTUALTABLE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-20) }

sig c540_SQLITE_OMIT_WAL extends c1_IMeasurable
{}
{ one @r_c540_SQLITE_OMIT_WAL.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-30) }

sig c547_SQLITE_OMIT_XFER_OPT extends c1_IMeasurable
{}
{ one @r_c547_SQLITE_OMIT_XFER_OPT.this
  (this.@r_c2_footprint.@c2_footprint_ref) = (-3) }

sig c554_SQLITE_DEBUG extends c1_IMeasurable
{}
{ one @r_c554_SQLITE_DEBUG.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 9 }

sig c560_SQLITE_MEMDEBUG extends c1_IMeasurable
{}
{ one @r_c560_SQLITE_MEMDEBUG.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 2 }

sig c566_total_footprint
{ c566_total_footprint_ref : one Int }
{ one @r_c566_total_footprint.this
  this.@c566_total_footprint_ref = (((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((this.~@r_c566_total_footprint).@r_c4_OperatingSystemCharacteristics).@r_c2_footprint.@c2_footprint_ref).add[((((this.~@r_c566_total_footprint).@r_c4_OperatingSystemCharacteristics).@r_c10_SQLITE_4_BYTE_ALIGNED_MALLOC).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c4_OperatingSystemCharacteristics).@r_c16_SQLITE_CASE_SENSITIVE_LIKE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c4_OperatingSystemCharacteristics).@r_c22_SQLITE_HAVE_ISNAN).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c4_OperatingSystemCharacteristics).@r_c28_SQLITE_SECURE_DELETE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c4_OperatingSystemCharacteristics).@r_c34_ChooseSQLITE_TEMP_STORE).@r_c2_footprint.@c2_footprint_ref)]).add[(((((this.~@r_c566_total_footprint).@r_c4_OperatingSystemCharacteristics).@r_c34_ChooseSQLITE_TEMP_STORE).@r_c40_SQLITE_TEMP_STORE_EQ_0).@r_c2_footprint.@c2_footprint_ref)]).add[(((((this.~@r_c566_total_footprint).@r_c4_OperatingSystemCharacteristics).@r_c34_ChooseSQLITE_TEMP_STORE).@r_c46_SQLITE_TEMP_STORE_EQ_1).@r_c2_footprint.@c2_footprint_ref)]).add[(((((this.~@r_c566_total_footprint).@r_c4_OperatingSystemCharacteristics).@r_c34_ChooseSQLITE_TEMP_STORE).@r_c52_SQLITE_TEMP_STORE_EQ_2).@r_c2_footprint.@c2_footprint_ref)]).add[(((((this.~@r_c566_total_footprint).@r_c4_OperatingSystemCharacteristics).@r_c34_ChooseSQLITE_TEMP_STORE).@r_c58_SQLITE_TEMP_STORE_EQ_3).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c70_SQLITE_ENABLE_ATOMIC_WRITE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c76_SQLITE_ENABLE_COLUMN_METADATA).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c84_SQLITE_ENABLE_FTS3).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c90_SQLITE_ENABLE_FTS3_PARENTHESIS).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c96_SQLITE_ENABLE_MEMORY_MANAGEMENT).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c102_ChooseMemSys).@r_c2_footprint.@c2_footprint_ref)]).add[(((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c102_ChooseMemSys).@r_c108_SQLITE_ENABLE_MEMSYS3).@r_c2_footprint.@c2_footprint_ref)]).add[(((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c102_ChooseMemSys).@r_c114_SQLITE_ENABLE_MEMSYS5).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c120_SQLITE_ENABLE_RTREE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c126_SQLITE_ENABLE_STAT2).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c138_SQLITE_ENABLE_UNLOCK_NOTIFY).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c144_SQLITE_SOUNDEX).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c64_EnableFeatures).@r_c150_YYTRACKMAXSTACKDEPTH).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c566_total_footprint).@r_c156_DisableFeatures).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c156_DisableFeatures).@r_c162_SQLITE_DISABLE_LFS).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c156_DisableFeatures).@r_c168_SQLITE_DISABLE_DIRSYNC).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c180_SQLITE_OMIT_ALTERTABLE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c187_SQLITE_OMIT_ANALYZE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c194_SQLITE_OMIT_ATTACH).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c201_SQLITE_OMIT_AUTHORIZATION).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c208_SQLITE_OMIT_AUTOINCREMENT).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c215_SQLITE_OMIT_AUTOMATIC_INDEX).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c222_SQLITE_OMIT_AUTOINIT).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c228_SQLITE_OMIT_AUTOVACUUM).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c241_SQLITE_OMIT_BLOB_LITERAL).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c248_SQLITE_OMIT_BTREECOUNT).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c255_SQLITE_OMIT_BUILTIN_TEST).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c262_SQLITE_OMIT_CAST).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c269_SQLITE_OMIT_CHECK).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c276_SQLITE_OMIT_COMPILEOPTION_DIAGS).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c283_SQLITE_OMIT_COMPLETE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c290_SQLITE_OMIT_COMPOUND_SELECT).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c297_SQLITE_OMIT_CONFLICT_CLAUSE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c303_SQLITE_OMIT_DATETIME_FUNCS).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c310_SQLITE_OMIT_DECLTYPE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c319_SQLITE_OMIT_DEPRECATED).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c326_SQLITE_OMIT_EXPLAIN).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c333_SQLITE_OMIT_FLAG_PRAGMAS).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c340_SQLITE_OMIT_FLOATING_POINT).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c347_SQLITE_OMIT_FOREIGN_KEY).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c354_SQLITE_OMIT_GET_TABLE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c361_SQLITE_OMIT_INCRBLOB).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c368_SQLITE_OMIT_INTEGRITY_CHECK).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c375_SQLITE_OMIT_LIKE_OPTIMIZATION).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c382_SQLITE_OMIT_LOAD_EXTENSION).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c389_SQLITE_OMIT_LOCALTIME).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c396_SQLITE_OMIT_LOOKASIDE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c403_SQLITE_OMIT_MEMORYDB).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c410_SQLITE_OMIT_OR_OPTIMIZATION).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c417_SQLITE_OMIT_PAGER_PRAGMAS).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c424_SQLITE_OMIT_PRAGMA).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c431_SQLITE_OMIT_PROGRESS_CALLBACK).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c438_SQLITE_OMIT_QUICKBALANCE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c445_SQLITE_OMIT_REINDEX).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c452_SQLITE_OMIT_SCHEMA_PRAGMAS).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c466_SQLITE_OMIT_SHARED_CACHE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c473_SQLITE_OMIT_SUBQUERY).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c480_SQLITE_OMIT_TCL_VARIABLE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c486_SQLITE_OMIT_TEMPDB).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c492_SQLITE_OMIT_TRACE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c499_SQLITE_OMIT_TRIGGER).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c512_SQLITE_OMIT_UTF16).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c519_SQLITE_OMIT_VACUUM).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c526_SQLITE_OMIT_VIEW).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c533_SQLITE_OMIT_VIRTUALTABLE).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c540_SQLITE_OMIT_WAL).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c566_total_footprint).@r_c174_OmitFeatures).@r_c547_SQLITE_OMIT_XFER_OPT).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c566_total_footprint).@r_c554_SQLITE_DEBUG).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c566_total_footprint).@r_c560_SQLITE_MEMDEBUG).@r_c2_footprint.@c2_footprint_ref)]) }

one sig c908_simpleConfig extends c3_SQLite
{}
{ (((((((((((((((((((((((((((((((((((((((((((((((((((((((((some (this.@r_c4_OperatingSystemCharacteristics).@r_c10_SQLITE_4_BYTE_ALIGNED_MALLOC) && (some (this.@r_c4_OperatingSystemCharacteristics).@r_c16_SQLITE_CASE_SENSITIVE_LIKE)) && (no (this.@r_c4_OperatingSystemCharacteristics).@r_c22_SQLITE_HAVE_ISNAN)) && (some ((this.@r_c4_OperatingSystemCharacteristics).@r_c34_ChooseSQLITE_TEMP_STORE).@r_c58_SQLITE_TEMP_STORE_EQ_3)) && (some this.@r_c64_EnableFeatures)) && (no (this.@r_c64_EnableFeatures).@r_c70_SQLITE_ENABLE_ATOMIC_WRITE)) && (no (this.@r_c64_EnableFeatures).@r_c90_SQLITE_ENABLE_FTS3_PARENTHESIS)) && (no (this.@r_c64_EnableFeatures).@r_c96_SQLITE_ENABLE_MEMORY_MANAGEMENT)) && (some (this.@r_c64_EnableFeatures).@r_c102_ChooseMemSys)) && (no ((this.@r_c64_EnableFeatures).@r_c102_ChooseMemSys).@r_c108_SQLITE_ENABLE_MEMSYS3)) && (no (this.@r_c64_EnableFeatures).@r_c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT)) && (no (this.@r_c64_EnableFeatures).@r_c138_SQLITE_ENABLE_UNLOCK_NOTIFY)) && (no (this.@r_c64_EnableFeatures).@r_c144_SQLITE_SOUNDEX)) && (some this.@r_c156_DisableFeatures)) && (some (this.@r_c156_DisableFeatures).@r_c162_SQLITE_DISABLE_LFS)) && (some (this.@r_c156_DisableFeatures).@r_c168_SQLITE_DISABLE_DIRSYNC)) && (some this.@r_c174_OmitFeatures)) && (some (this.@r_c174_OmitFeatures).@r_c180_SQLITE_OMIT_ALTERTABLE)) && (some (this.@r_c174_OmitFeatures).@r_c187_SQLITE_OMIT_ANALYZE)) && (some (this.@r_c174_OmitFeatures).@r_c194_SQLITE_OMIT_ATTACH)) && (no (this.@r_c174_OmitFeatures).@r_c201_SQLITE_OMIT_AUTHORIZATION)) && (no (this.@r_c174_OmitFeatures).@r_c208_SQLITE_OMIT_AUTOINCREMENT)) && (some (this.@r_c174_OmitFeatures).@r_c215_SQLITE_OMIT_AUTOMATIC_INDEX)) && (no (this.@r_c174_OmitFeatures).@r_c222_SQLITE_OMIT_AUTOINIT)) && (some (this.@r_c174_OmitFeatures).@r_c228_SQLITE_OMIT_AUTOVACUUM)) && (some (this.@r_c174_OmitFeatures).@r_c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION)) && (no (this.@r_c174_OmitFeatures).@r_c248_SQLITE_OMIT_BTREECOUNT)) && (no (this.@r_c174_OmitFeatures).@r_c262_SQLITE_OMIT_CAST)) && (some (this.@r_c174_OmitFeatures).@r_c269_SQLITE_OMIT_CHECK)) && (no (this.@r_c174_OmitFeatures).@r_c276_SQLITE_OMIT_COMPILEOPTION_DIAGS)) && (some (this.@r_c174_OmitFeatures).@r_c297_SQLITE_OMIT_CONFLICT_CLAUSE)) && (no (this.@r_c174_OmitFeatures).@r_c303_SQLITE_OMIT_DATETIME_FUNCS)) && (some (this.@r_c174_OmitFeatures).@r_c310_SQLITE_OMIT_DECLTYPE)) && (no (this.@r_c174_OmitFeatures).@r_c326_SQLITE_OMIT_EXPLAIN)) && (no (this.@r_c174_OmitFeatures).@r_c333_SQLITE_OMIT_FLAG_PRAGMAS)) && (some (this.@r_c174_OmitFeatures).@r_c340_SQLITE_OMIT_FLOATING_POINT)) && (some (this.@r_c174_OmitFeatures).@r_c347_SQLITE_OMIT_FOREIGN_KEY)) && (no (this.@r_c174_OmitFeatures).@r_c354_SQLITE_OMIT_GET_TABLE)) && (some (this.@r_c174_OmitFeatures).@r_c361_SQLITE_OMIT_INCRBLOB)) && (some (this.@r_c174_OmitFeatures).@r_c375_SQLITE_OMIT_LIKE_OPTIMIZATION)) && (no (this.@r_c174_OmitFeatures).@r_c382_SQLITE_OMIT_LOAD_EXTENSION)) && (no (this.@r_c174_OmitFeatures).@r_c389_SQLITE_OMIT_LOCALTIME)) && (no (this.@r_c174_OmitFeatures).@r_c396_SQLITE_OMIT_LOOKASIDE)) && (no (this.@r_c174_OmitFeatures).@r_c403_SQLITE_OMIT_MEMORYDB)) && (some (this.@r_c174_OmitFeatures).@r_c417_SQLITE_OMIT_PAGER_PRAGMAS)) && (no (this.@r_c174_OmitFeatures).@r_c438_SQLITE_OMIT_QUICKBALANCE)) && (no (this.@r_c174_OmitFeatures).@r_c445_SQLITE_OMIT_REINDEX)) && (some (this.@r_c174_OmitFeatures).@r_c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS)) && (some (this.@r_c174_OmitFeatures).@r_c466_SQLITE_OMIT_SHARED_CACHE)) && (some (this.@r_c174_OmitFeatures).@r_c480_SQLITE_OMIT_TCL_VARIABLE)) && (no (this.@r_c174_OmitFeatures).@r_c486_SQLITE_OMIT_TEMPDB)) && (some (this.@r_c174_OmitFeatures).@r_c492_SQLITE_OMIT_TRACE)) && (no (this.@r_c174_OmitFeatures).@r_c499_SQLITE_OMIT_TRIGGER)) && (some (this.@r_c174_OmitFeatures).@r_c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION)) && (no (this.@r_c174_OmitFeatures).@r_c526_SQLITE_OMIT_VIEW)) && (no (this.@r_c174_OmitFeatures).@r_c533_SQLITE_OMIT_VIRTUALTABLE)) && (no this.@r_c554_SQLITE_DEBUG)) && (some this.@r_c560_SQLITE_MEMDEBUG) }

objectives o_global {
minimize c908_simpleConfig.@r_c566_total_footprint.@c566_total_footprint_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> -1024  + concrete_int_bag -> -1023  + concrete_int_bag -> 5  + concrete_int_bag -> 6  + concrete_int_bag -> 7  + concrete_int_bag -> 8  + concrete_int_bag -> 10  + concrete_int_bag -> 11  + concrete_int_bag -> 12  + concrete_int_bag -> 13  + concrete_int_bag -> 14  + concrete_int_bag -> 15  + concrete_int_bag -> 16  + concrete_int_bag -> 17  + concrete_int_bag -> 18  + concrete_int_bag -> 19  + concrete_int_bag -> 20  + concrete_int_bag -> 21  + concrete_int_bag -> 22  + concrete_int_bag -> 23  + concrete_int_bag -> 24  + concrete_int_bag -> 25  + concrete_int_bag -> 26  + concrete_int_bag -> 27  + concrete_int_bag -> 28  + concrete_int_bag -> 29  + concrete_int_bag -> 30  + concrete_int_bag -> 31  + concrete_int_bag -> 32  + concrete_int_bag -> 34  + concrete_int_bag -> 35  + concrete_int_bag -> 36  + concrete_int_bag -> 37  + concrete_int_bag -> 38  + concrete_int_bag -> 39  + concrete_int_bag -> 40  + concrete_int_bag -> 41  + concrete_int_bag -> 42  + concrete_int_bag -> 43  + concrete_int_bag -> 44  + concrete_int_bag -> 45  + concrete_int_bag -> 46  + concrete_int_bag -> 47  + concrete_int_bag -> 48  + concrete_int_bag -> 49  + concrete_int_bag -> 50  + concrete_int_bag -> 51  + concrete_int_bag -> 52  + concrete_int_bag -> 53  + concrete_int_bag -> 54  + concrete_int_bag -> 55  + concrete_int_bag -> 56  + concrete_int_bag -> 57  + concrete_int_bag -> 58  + concrete_int_bag -> 59  + concrete_int_bag -> 60  + concrete_int_bag -> 61  + concrete_int_bag -> 62  + concrete_int_bag -> 63  + concrete_int_bag -> 64  + concrete_int_bag -> 65  + concrete_int_bag -> 66  + concrete_int_bag -> 67  + concrete_int_bag -> 68  + concrete_int_bag -> 69  + concrete_int_bag -> 70  + concrete_int_bag -> 71  + concrete_int_bag -> 72  + concrete_int_bag -> 73  + concrete_int_bag -> 74  + concrete_int_bag -> 75  + concrete_int_bag -> 76  + concrete_int_bag -> 77  + concrete_int_bag -> 78  + concrete_int_bag -> 79  + concrete_int_bag -> 80  + concrete_int_bag -> 81  + concrete_int_bag -> 82  + concrete_int_bag -> 83  + concrete_int_bag -> 84  + concrete_int_bag -> 85  + concrete_int_bag -> 86  + concrete_int_bag -> 87  + concrete_int_bag -> 88  + concrete_int_bag -> 89  + concrete_int_bag -> 90  + concrete_int_bag -> 91  + concrete_int_bag -> 92  + concrete_int_bag -> 93  + concrete_int_bag -> 94  + concrete_int_bag -> 95  + concrete_int_bag -> 96  + concrete_int_bag -> 97  + concrete_int_bag -> 98  + concrete_int_bag -> 99  + concrete_int_bag -> 101  + concrete_int_bag -> 102  + concrete_int_bag -> 103  + concrete_int_bag -> 104  + concrete_int_bag -> 105  + concrete_int_bag -> 106  + concrete_int_bag -> 107  + concrete_int_bag -> 108  + concrete_int_bag -> 109  + concrete_int_bag -> 110  + concrete_int_bag -> 111  + concrete_int_bag -> 112  + concrete_int_bag -> 113  + concrete_int_bag -> 114  + concrete_int_bag -> 115  + concrete_int_bag -> 116  + concrete_int_bag -> 117  + concrete_int_bag -> 118  + concrete_int_bag -> 119  + concrete_int_bag -> 120  + concrete_int_bag -> 121  + concrete_int_bag -> 122  + concrete_int_bag -> 123  + concrete_int_bag -> 124  + concrete_int_bag -> 125  + concrete_int_bag -> 126  + concrete_int_bag -> 127  + concrete_int_bag -> 128  + concrete_int_bag -> 129  + concrete_int_bag -> 130  + concrete_int_bag -> 131  + concrete_int_bag -> 132  + concrete_int_bag -> 133  + concrete_int_bag -> 134  + concrete_int_bag -> 135  + concrete_int_bag -> 136  + concrete_int_bag -> 137  + concrete_int_bag -> 138  + concrete_int_bag -> 139  + concrete_int_bag -> 140  + concrete_int_bag -> 141  + concrete_int_bag -> 142  + concrete_int_bag -> 143  + concrete_int_bag -> 144  + concrete_int_bag -> 145  + concrete_int_bag -> 146  + concrete_int_bag -> 147  + concrete_int_bag -> 148  + concrete_int_bag -> 149  + concrete_int_bag -> 150  + concrete_int_bag -> 151  + concrete_int_bag -> 152  + concrete_int_bag -> 153  + concrete_int_bag -> 154  + concrete_int_bag -> 155  + concrete_int_bag -> 156  + concrete_int_bag -> 157  + concrete_int_bag -> 158  + concrete_int_bag -> 159  + concrete_int_bag -> 160  + concrete_int_bag -> 161  + concrete_int_bag -> 162  + concrete_int_bag -> 163  + concrete_int_bag -> 164  + concrete_int_bag -> -131  + concrete_int_bag -> -996  + concrete_int_bag -> -1022  + concrete_int_bag -> -881  + concrete_int_bag -> -23  + concrete_int_bag -> -1017  + concrete_int_bag -> -851  + concrete_int_bag -> -1016  + concrete_int_bag -> -176  + concrete_int_bag -> -197  + concrete_int_bag -> -1015  + concrete_int_bag -> -926  + concrete_int_bag -> -299  + concrete_int_bag -> -203  + concrete_int_bag -> -1014  + concrete_int_bag -> -59  + concrete_int_bag -> -977  + concrete_int_bag -> -127  + concrete_int_bag -> -293  + concrete_int_bag -> -1013  + concrete_int_bag -> -289  + concrete_int_bag -> -971  + concrete_int_bag -> -1021  + concrete_int_bag -> -287  + concrete_int_bag -> -1012  + concrete_int_bag -> -107  + concrete_int_bag -> -125  + concrete_int_bag -> -41  + concrete_int_bag -> -875  + concrete_int_bag -> -965  + concrete_int_bag -> -281  + concrete_int_bag -> -1011  + concrete_int_bag -> -71  + concrete_int_bag -> -857  + concrete_int_bag -> -101  + concrete_int_bag -> -277  + concrete_int_bag -> -959  + concrete_int_bag -> -276  + concrete_int_bag -> -1010  + concrete_int_bag -> -275  + concrete_int_bag -> -884  + concrete_int_bag -> -191  + concrete_int_bag -> -29  + concrete_int_bag -> -1009  + concrete_int_bag -> -161  + concrete_int_bag -> -953  + concrete_int_bag -> -269  + concrete_int_bag -> -143  + concrete_int_bag -> -1008  + concrete_int_bag -> -53  + concrete_int_bag -> -947  + concrete_int_bag -> -173  + concrete_int_bag -> -1020  + concrete_int_bag -> -263  + concrete_int_bag -> -35  + concrete_int_bag -> -65  + concrete_int_bag -> -1007  + concrete_int_bag -> -179  + concrete_int_bag -> -941  + concrete_int_bag -> -188  + concrete_int_bag -> -95  + concrete_int_bag -> -257  + concrete_int_bag -> -1006  + concrete_int_bag -> -185  + concrete_int_bag -> -239  + concrete_int_bag -> -254  + concrete_int_bag -> -119  + concrete_int_bag -> -253  + concrete_int_bag -> -869  + concrete_int_bag -> -935  + concrete_int_bag -> -251  + concrete_int_bag -> -1005  + concrete_int_bag -> -144  + concrete_int_bag -> -929  + concrete_int_bag -> -246  + concrete_int_bag -> -1004  + concrete_int_bag -> -245  + concrete_int_bag -> 589  + concrete_int_bag -> 590  + concrete_int_bag -> 591  + concrete_int_bag -> 592  + concrete_int_bag -> 593  + concrete_int_bag -> 594  + concrete_int_bag -> 595  + concrete_int_bag -> 596  + concrete_int_bag -> 597  + concrete_int_bag -> 598  + concrete_int_bag -> 599  + concrete_int_bag -> 600  + concrete_int_bag -> 601  + concrete_int_bag -> 602  + concrete_int_bag -> 603  + concrete_int_bag -> 604  + concrete_int_bag -> 605  + concrete_int_bag -> 606  + concrete_int_bag -> 607  + concrete_int_bag -> 608  + concrete_int_bag -> 609  + concrete_int_bag -> 610  + concrete_int_bag -> 611  + concrete_int_bag -> 612  + concrete_int_bag -> 613  + concrete_int_bag -> 614  + concrete_int_bag -> 615  + concrete_int_bag -> 616  + concrete_int_bag -> 617  + concrete_int_bag -> 618  + concrete_int_bag -> 619  + concrete_int_bag -> 620  + concrete_int_bag -> 621  + concrete_int_bag -> 622  + concrete_int_bag -> 623  + concrete_int_bag -> 624  + concrete_int_bag -> 625  + concrete_int_bag -> 626  + concrete_int_bag -> 627  + concrete_int_bag -> 628  + concrete_int_bag -> 629  + concrete_int_bag -> 630  + concrete_int_bag -> 631  + concrete_int_bag -> 632  + concrete_int_bag -> 633  + concrete_int_bag -> 634  + concrete_int_bag -> 635  + concrete_int_bag -> 636  + concrete_int_bag -> 637  + concrete_int_bag -> 638  + concrete_int_bag -> 639  + concrete_int_bag -> 640  + concrete_int_bag -> 641  + concrete_int_bag -> 642  + concrete_int_bag -> 643  + concrete_int_bag -> 644  + concrete_int_bag -> 645  + concrete_int_bag -> 646  + concrete_int_bag -> 647  + concrete_int_bag -> 648  + concrete_int_bag -> 649  + concrete_int_bag -> 650  + concrete_int_bag -> 651  + concrete_int_bag -> 652  + concrete_int_bag -> 653  + concrete_int_bag -> 654  + concrete_int_bag -> 655  + concrete_int_bag -> 656  + concrete_int_bag -> 657  + concrete_int_bag -> 658  + concrete_int_bag -> 659  + concrete_int_bag -> 660  + concrete_int_bag -> 661  + concrete_int_bag -> 662  + concrete_int_bag -> 663  + concrete_int_bag -> 664  + concrete_int_bag -> 665  + concrete_int_bag -> 666  + concrete_int_bag -> 667  + concrete_int_bag -> 668  + concrete_int_bag -> 669  + concrete_int_bag -> 670  + concrete_int_bag -> 671  + concrete_int_bag -> 672  + concrete_int_bag -> 673  + concrete_int_bag -> 674  + concrete_int_bag -> 675  + concrete_int_bag -> 676  + concrete_int_bag -> 677  + concrete_int_bag -> 678  + concrete_int_bag -> 679  + concrete_int_bag -> 680  + concrete_int_bag -> 681  + concrete_int_bag -> 682  + concrete_int_bag -> 683  + concrete_int_bag -> 684  + concrete_int_bag -> 685  + concrete_int_bag -> 686  + concrete_int_bag -> 687  + concrete_int_bag -> 688  + concrete_int_bag -> 689  + concrete_int_bag -> 690  + concrete_int_bag -> 691  + concrete_int_bag -> 692  + concrete_int_bag -> 693  + concrete_int_bag -> 694  + concrete_int_bag -> 695  + concrete_int_bag -> 696  + concrete_int_bag -> 697  + concrete_int_bag -> 698  + concrete_int_bag -> 699  + concrete_int_bag -> 700  + concrete_int_bag -> 701  + concrete_int_bag -> 702  + concrete_int_bag -> 703  + concrete_int_bag -> 704  + concrete_int_bag -> 705  + concrete_int_bag -> 706  + concrete_int_bag -> 707  + concrete_int_bag -> 708  + concrete_int_bag -> 709  + concrete_int_bag -> 710  + concrete_int_bag -> 711  + concrete_int_bag -> 712  + concrete_int_bag -> 713  + concrete_int_bag -> 714  + concrete_int_bag -> 715  + concrete_int_bag -> 716  + concrete_int_bag -> 717  + concrete_int_bag -> 718  + concrete_int_bag -> 719  + concrete_int_bag -> 720  + concrete_int_bag -> 721  + concrete_int_bag -> 722  + concrete_int_bag -> 723  + concrete_int_bag -> 724  + concrete_int_bag -> 725  + concrete_int_bag -> 726  + concrete_int_bag -> 727  + concrete_int_bag -> 728  + concrete_int_bag -> 729  + concrete_int_bag -> 730  + concrete_int_bag -> 731  + concrete_int_bag -> 732  + concrete_int_bag -> 733  + concrete_int_bag -> 734  + concrete_int_bag -> 735  + concrete_int_bag -> 736  + concrete_int_bag -> 737  + concrete_int_bag -> 738  + concrete_int_bag -> 739  + concrete_int_bag -> 740  + concrete_int_bag -> 741  + concrete_int_bag -> 742  + concrete_int_bag -> 743  + concrete_int_bag -> 744  + concrete_int_bag -> 745  + concrete_int_bag -> 746  + concrete_int_bag -> 747  + concrete_int_bag -> 748  + concrete_int_bag -> 749  + concrete_int_bag -> 750  + concrete_int_bag -> 751  + concrete_int_bag -> 752  + concrete_int_bag -> 753  + concrete_int_bag -> 754  + concrete_int_bag -> 755  + concrete_int_bag -> 756  + concrete_int_bag -> 757  + concrete_int_bag -> 758  + concrete_int_bag -> 759  + concrete_int_bag -> 760  + concrete_int_bag -> 761  + concrete_int_bag -> 762  + concrete_int_bag -> 763  + concrete_int_bag -> 764  + concrete_int_bag -> 765  + concrete_int_bag -> 766  + concrete_int_bag -> 767  + concrete_int_bag -> 768  + concrete_int_bag -> 769  + concrete_int_bag -> 770  + concrete_int_bag -> 771  + concrete_int_bag -> 772  + concrete_int_bag -> 773  + concrete_int_bag -> 774  + concrete_int_bag -> 775  + concrete_int_bag -> 776  + concrete_int_bag -> 777  + concrete_int_bag -> 778  + concrete_int_bag -> 779  + concrete_int_bag -> 780  + concrete_int_bag -> 781  + concrete_int_bag -> 782  + concrete_int_bag -> 783  + concrete_int_bag -> 784  + concrete_int_bag -> 785  + concrete_int_bag -> 786  + concrete_int_bag -> 787  + concrete_int_bag -> 788  + concrete_int_bag -> 789  + concrete_int_bag -> 790  + concrete_int_bag -> 791  + concrete_int_bag -> 792  + concrete_int_bag -> 793  + concrete_int_bag -> 794  + concrete_int_bag -> 795  + concrete_int_bag -> 796  + concrete_int_bag -> 797  + concrete_int_bag -> 798  + concrete_int_bag -> 799  + concrete_int_bag -> 800  + concrete_int_bag -> 801  + concrete_int_bag -> 802  + concrete_int_bag -> 803  + concrete_int_bag -> 804  + concrete_int_bag -> 805  + concrete_int_bag -> 806  + concrete_int_bag -> 807  + concrete_int_bag -> 808  + concrete_int_bag -> 809  + concrete_int_bag -> 810  + concrete_int_bag -> 811  + concrete_int_bag -> 812  + concrete_int_bag -> 813  + concrete_int_bag -> 814  + concrete_int_bag -> 815  + concrete_int_bag -> 816  + concrete_int_bag -> 817  + concrete_int_bag -> 818  + concrete_int_bag -> 819  + concrete_int_bag -> 820  + concrete_int_bag -> 821  + concrete_int_bag -> 822  + concrete_int_bag -> 823  + concrete_int_bag -> 824  + concrete_int_bag -> 825  + concrete_int_bag -> 826  + concrete_int_bag -> 827  + concrete_int_bag -> 828  + concrete_int_bag -> 829  + concrete_int_bag -> 830  + concrete_int_bag -> 831  + concrete_int_bag -> 832  + concrete_int_bag -> 833  + concrete_int_bag -> 834  + concrete_int_bag -> 835  + concrete_int_bag -> 836  + concrete_int_bag -> 837  + concrete_int_bag -> 838  + concrete_int_bag -> 839  + concrete_int_bag -> 840  + concrete_int_bag -> 841  + concrete_int_bag -> 842  + concrete_int_bag -> 843  + concrete_int_bag -> 844  + concrete_int_bag -> 845  + concrete_int_bag -> 846  + concrete_int_bag -> 847  + concrete_int_bag -> 848  + concrete_int_bag -> 849  + concrete_int_bag -> 850  + concrete_int_bag -> 851  + concrete_int_bag -> 852  + concrete_int_bag -> 853  + concrete_int_bag -> 854  + concrete_int_bag -> 855  + concrete_int_bag -> 856  + concrete_int_bag -> 857  + concrete_int_bag -> 858  + concrete_int_bag -> 859  + concrete_int_bag -> 860  + concrete_int_bag -> 861  + concrete_int_bag -> 862  + concrete_int_bag -> 863  + concrete_int_bag -> 864  + concrete_int_bag -> 865  + concrete_int_bag -> 866  + concrete_int_bag -> 867  + concrete_int_bag -> 868  + concrete_int_bag -> 869  + concrete_int_bag -> 870  + concrete_int_bag -> 871  + concrete_int_bag -> 872  + concrete_int_bag -> 873  + concrete_int_bag -> 874  + concrete_int_bag -> 875  + concrete_int_bag -> 876  + concrete_int_bag -> 877  + concrete_int_bag -> 878  + concrete_int_bag -> 879  + concrete_int_bag -> 880  + concrete_int_bag -> 881  + concrete_int_bag -> 882  + concrete_int_bag -> 883  + concrete_int_bag -> 884  + concrete_int_bag -> 885  + concrete_int_bag -> 886  + concrete_int_bag -> 887  + concrete_int_bag -> -1160  + concrete_int_bag -> 889  + concrete_int_bag -> 890  + concrete_int_bag -> 891  + concrete_int_bag -> 892  + concrete_int_bag -> 893  + concrete_int_bag -> 894  + concrete_int_bag -> 895  + concrete_int_bag -> 896  + concrete_int_bag -> 897  + concrete_int_bag -> 898  + concrete_int_bag -> 899  + concrete_int_bag -> 900  + concrete_int_bag -> 901  + concrete_int_bag -> 902  + concrete_int_bag -> 903  + concrete_int_bag -> 904  + concrete_int_bag -> 905  + concrete_int_bag -> 906  + concrete_int_bag -> 907  + concrete_int_bag -> 908  + concrete_int_bag -> 909  + concrete_int_bag -> 910  + concrete_int_bag -> 911  + concrete_int_bag -> 912  + concrete_int_bag -> 913  + concrete_int_bag -> 914  + concrete_int_bag -> 915  + concrete_int_bag -> 916  + concrete_int_bag -> 917  + concrete_int_bag -> 918  + concrete_int_bag -> 919  + concrete_int_bag -> 920  + concrete_int_bag -> 921  + concrete_int_bag -> 922  + concrete_int_bag -> 923  + concrete_int_bag -> 924  + concrete_int_bag -> 925  + concrete_int_bag -> 926  + concrete_int_bag -> 927  + concrete_int_bag -> 928  + concrete_int_bag -> 929  + concrete_int_bag -> 930  + concrete_int_bag -> 931  + concrete_int_bag -> 932  + concrete_int_bag -> 933  + concrete_int_bag -> 934  + concrete_int_bag -> 935  + concrete_int_bag -> 936  + concrete_int_bag -> 937  + concrete_int_bag -> 938  + concrete_int_bag -> 939  + concrete_int_bag -> 940  + concrete_int_bag -> 941  + concrete_int_bag -> 942  + concrete_int_bag -> 943  + concrete_int_bag -> 944  + concrete_int_bag -> 945  + concrete_int_bag -> 946  + concrete_int_bag -> 947  + concrete_int_bag -> 948  + concrete_int_bag -> 949  + concrete_int_bag -> 950  + concrete_int_bag -> 951  + concrete_int_bag -> 952  + concrete_int_bag -> 953  + concrete_int_bag -> 954  + concrete_int_bag -> 955  + concrete_int_bag -> 956  + concrete_int_bag -> 957  + concrete_int_bag -> 958  + concrete_int_bag -> 959  + concrete_int_bag -> 960  + concrete_int_bag -> 961  + concrete_int_bag -> 962  + concrete_int_bag -> 963  + concrete_int_bag -> 964  + concrete_int_bag -> 965  + concrete_int_bag -> 966  + concrete_int_bag -> 967  + concrete_int_bag -> 968  + concrete_int_bag -> 969  + concrete_int_bag -> 970  + concrete_int_bag -> 971  + concrete_int_bag -> 972  + concrete_int_bag -> 973  + concrete_int_bag -> 974  + concrete_int_bag -> 975  + concrete_int_bag -> 976  + concrete_int_bag -> 977  + concrete_int_bag -> 978  + concrete_int_bag -> 979  + concrete_int_bag -> 980  + concrete_int_bag -> 981  + concrete_int_bag -> 982  + concrete_int_bag -> 983  + concrete_int_bag -> 984  + concrete_int_bag -> 985  + concrete_int_bag -> 986  + concrete_int_bag -> 987  + concrete_int_bag -> 988  + concrete_int_bag -> 989  + concrete_int_bag -> 990  + concrete_int_bag -> 991  + concrete_int_bag -> 992  + concrete_int_bag -> 993  + concrete_int_bag -> 994  + concrete_int_bag -> 995  + concrete_int_bag -> 996  + concrete_int_bag -> 997  + concrete_int_bag -> 998  + concrete_int_bag -> 999  + concrete_int_bag -> 1000  + concrete_int_bag -> 1001  + concrete_int_bag -> 1002  + concrete_int_bag -> 1003  + concrete_int_bag -> 1004  + concrete_int_bag -> 1005  + concrete_int_bag -> 1006  + concrete_int_bag -> 1007  + concrete_int_bag -> 1008  + concrete_int_bag -> 1009  + concrete_int_bag -> 1010  + concrete_int_bag -> 1011  + concrete_int_bag -> 1012  + concrete_int_bag -> 1013  + concrete_int_bag -> 1014  + concrete_int_bag -> 1015  + concrete_int_bag -> 1016  + concrete_int_bag -> 1017  + concrete_int_bag -> 1018  + concrete_int_bag -> 1019  + concrete_int_bag -> 1020  + concrete_int_bag -> 1021  + concrete_int_bag -> 1022  + concrete_int_bag -> 1023  + concrete_int_bag -> 1024  + concrete_int_bag -> 1025  + concrete_int_bag -> 1026  + concrete_int_bag -> 1027  + concrete_int_bag -> 1028  + concrete_int_bag -> 1029  + concrete_int_bag -> 1030  + concrete_int_bag -> 1031  + concrete_int_bag -> 1032  + concrete_int_bag -> 1033  + concrete_int_bag -> 1034  + concrete_int_bag -> 1035  + concrete_int_bag -> 1036  + concrete_int_bag -> 1037  + concrete_int_bag -> 1038  + concrete_int_bag -> 1039  + concrete_int_bag -> 1040  + concrete_int_bag -> 1041  + concrete_int_bag -> 1042  + concrete_int_bag -> 1043  + concrete_int_bag -> 1044  + concrete_int_bag -> 1045  + concrete_int_bag -> 1046  + concrete_int_bag -> 1047  + concrete_int_bag -> 1048  + concrete_int_bag -> 1049  + concrete_int_bag -> 1050  + concrete_int_bag -> 1051  + concrete_int_bag -> 1052  + concrete_int_bag -> -995  + concrete_int_bag -> -994  + concrete_int_bag -> -993  + concrete_int_bag -> -992  + concrete_int_bag -> -991  + concrete_int_bag -> -990  + concrete_int_bag -> -989  + concrete_int_bag -> -988  + concrete_int_bag -> -987  + concrete_int_bag -> -986  + concrete_int_bag -> -985  + concrete_int_bag -> -984  + concrete_int_bag -> -983  + concrete_int_bag -> -982  + concrete_int_bag -> -981  + concrete_int_bag -> -980  + concrete_int_bag -> -979  + concrete_int_bag -> -978  + concrete_int_bag -> -1187  + concrete_int_bag -> -976  + concrete_int_bag -> -975  + concrete_int_bag -> -974  + concrete_int_bag -> -973  + concrete_int_bag -> -972  + concrete_int_bag -> -1186  + concrete_int_bag -> -970  + concrete_int_bag -> -969  + concrete_int_bag -> -968  + concrete_int_bag -> -967  + concrete_int_bag -> -966  + concrete_int_bag -> -1185  + concrete_int_bag -> -964  + concrete_int_bag -> -963  + concrete_int_bag -> -962  + concrete_int_bag -> -961  + concrete_int_bag -> -960  + concrete_int_bag -> -1184  + concrete_int_bag -> -958  + concrete_int_bag -> -957  + concrete_int_bag -> -956  + concrete_int_bag -> -955  + concrete_int_bag -> -954  + concrete_int_bag -> -1183  + concrete_int_bag -> -952  + concrete_int_bag -> -951  + concrete_int_bag -> -950  + concrete_int_bag -> -949  + concrete_int_bag -> -948  + concrete_int_bag -> -1182  + concrete_int_bag -> -946  + concrete_int_bag -> -945  + concrete_int_bag -> -944  + concrete_int_bag -> -943  + concrete_int_bag -> -942  + concrete_int_bag -> -1181  + concrete_int_bag -> -940  + concrete_int_bag -> -939  + concrete_int_bag -> -938  + concrete_int_bag -> -937  + concrete_int_bag -> -936  + concrete_int_bag -> -1180  + concrete_int_bag -> -934  + concrete_int_bag -> -933  + concrete_int_bag -> -932  + concrete_int_bag -> -931  + concrete_int_bag -> -930  + concrete_int_bag -> -1179  + concrete_int_bag -> -928  + concrete_int_bag -> -927  + concrete_int_bag -> -1002  + concrete_int_bag -> -925  + concrete_int_bag -> -924  + concrete_int_bag -> -1178  + concrete_int_bag -> -922  + concrete_int_bag -> -921  + concrete_int_bag -> -920  + concrete_int_bag -> -919  + concrete_int_bag -> -918  + concrete_int_bag -> -1177  + concrete_int_bag -> -916  + concrete_int_bag -> -915  + concrete_int_bag -> -914  + concrete_int_bag -> -913  + concrete_int_bag -> -912  + concrete_int_bag -> -1176  + concrete_int_bag -> -910  + concrete_int_bag -> -917  + concrete_int_bag -> -908  + concrete_int_bag -> -907  + concrete_int_bag -> -906  + concrete_int_bag -> -1175  + concrete_int_bag -> -904  + concrete_int_bag -> -903  + concrete_int_bag -> -902  + concrete_int_bag -> -901  + concrete_int_bag -> -900  + concrete_int_bag -> -1174  + concrete_int_bag -> -898  + concrete_int_bag -> -897  + concrete_int_bag -> -896  + concrete_int_bag -> -895  + concrete_int_bag -> -894  + concrete_int_bag -> -1173  + concrete_int_bag -> -892  + concrete_int_bag -> -891  + concrete_int_bag -> -890  + concrete_int_bag -> -889  + concrete_int_bag -> -1172  + concrete_int_bag -> -886  + concrete_int_bag -> -885  + concrete_int_bag -> -1019  + concrete_int_bag -> -883  + concrete_int_bag -> -882  + concrete_int_bag -> -1171  + concrete_int_bag -> -880  + concrete_int_bag -> -879  + concrete_int_bag -> -878  + concrete_int_bag -> -877  + concrete_int_bag -> -876  + concrete_int_bag -> -1170  + concrete_int_bag -> -874  + concrete_int_bag -> -873  + concrete_int_bag -> -872  + concrete_int_bag -> -871  + concrete_int_bag -> -870  + concrete_int_bag -> -1169  + concrete_int_bag -> -868  + concrete_int_bag -> -867  + concrete_int_bag -> -866  + concrete_int_bag -> -865  + concrete_int_bag -> -864  + concrete_int_bag -> -1168  + concrete_int_bag -> -862  + concrete_int_bag -> -861  + concrete_int_bag -> -860  + concrete_int_bag -> -859  + concrete_int_bag -> -858  + concrete_int_bag -> -1167  + concrete_int_bag -> -856  + concrete_int_bag -> -855  + concrete_int_bag -> -854  + concrete_int_bag -> -853  + concrete_int_bag -> -852  + concrete_int_bag -> -1166  + concrete_int_bag -> -850  + concrete_int_bag -> -849  + concrete_int_bag -> -848  + concrete_int_bag -> -847  + concrete_int_bag -> -846  + concrete_int_bag -> -1165  + concrete_int_bag -> -844  + concrete_int_bag -> -843  + concrete_int_bag -> -842  + concrete_int_bag -> -841  + concrete_int_bag -> -840  + concrete_int_bag -> -1164  + concrete_int_bag -> -838  + concrete_int_bag -> -837  + concrete_int_bag -> -836  + concrete_int_bag -> -835  + concrete_int_bag -> -834  + concrete_int_bag -> -1163  + concrete_int_bag -> -832  + concrete_int_bag -> -831  + concrete_int_bag -> -830  + concrete_int_bag -> -829  + concrete_int_bag -> -828  + concrete_int_bag -> -1162  + concrete_int_bag -> -826  + concrete_int_bag -> -825  + concrete_int_bag -> -824  + concrete_int_bag -> -823  + concrete_int_bag -> -822  + concrete_int_bag -> -1161  + concrete_int_bag -> -820  + concrete_int_bag -> -819  + concrete_int_bag -> -818  + concrete_int_bag -> -817  + concrete_int_bag -> -816  + concrete_int_bag -> -815  + concrete_int_bag -> -814  + concrete_int_bag -> -813  + concrete_int_bag -> -812  + concrete_int_bag -> -811  + concrete_int_bag -> -810  + concrete_int_bag -> -1159  + concrete_int_bag -> -808  + concrete_int_bag -> -807  + concrete_int_bag -> -806  + concrete_int_bag -> -805  + concrete_int_bag -> -804  + concrete_int_bag -> -1158  + concrete_int_bag -> -802  + concrete_int_bag -> -801  + concrete_int_bag -> -800  + concrete_int_bag -> -799  + concrete_int_bag -> -798  + concrete_int_bag -> -1157  + concrete_int_bag -> -796  + concrete_int_bag -> -845  + concrete_int_bag -> -794  + concrete_int_bag -> -793  + concrete_int_bag -> -792  + concrete_int_bag -> -1156  + concrete_int_bag -> -790  + concrete_int_bag -> -789  + concrete_int_bag -> -788  + concrete_int_bag -> -787  + concrete_int_bag -> -786  + concrete_int_bag -> -1155  + concrete_int_bag -> -784  + concrete_int_bag -> -783  + concrete_int_bag -> -782  + concrete_int_bag -> -781  + concrete_int_bag -> -780  + concrete_int_bag -> -1154  + concrete_int_bag -> -778  + concrete_int_bag -> -777  + concrete_int_bag -> -1001  + concrete_int_bag -> -775  + concrete_int_bag -> -774  + concrete_int_bag -> -1153  + concrete_int_bag -> -772  + concrete_int_bag -> -771  + concrete_int_bag -> -770  + concrete_int_bag -> -769  + concrete_int_bag -> -768  + concrete_int_bag -> -1152  + concrete_int_bag -> -766  + concrete_int_bag -> -765  + concrete_int_bag -> -764  + concrete_int_bag -> -763  + concrete_int_bag -> -762  + concrete_int_bag -> -1151  + concrete_int_bag -> -760  + concrete_int_bag -> -759  + concrete_int_bag -> -758  + concrete_int_bag -> -809  + concrete_int_bag -> -756  + concrete_int_bag -> -1150  + concrete_int_bag -> -754  + concrete_int_bag -> -753  + concrete_int_bag -> -752  + concrete_int_bag -> -751  + concrete_int_bag -> -750  + concrete_int_bag -> -1149  + concrete_int_bag -> -748  + concrete_int_bag -> -747  + concrete_int_bag -> -746  + concrete_int_bag -> -745  + concrete_int_bag -> -744  + concrete_int_bag -> -1148  + concrete_int_bag -> -742  + concrete_int_bag -> -741  + concrete_int_bag -> -740  + concrete_int_bag -> -739  + concrete_int_bag -> -738  + concrete_int_bag -> -1147  + concrete_int_bag -> -736  + concrete_int_bag -> -735  + concrete_int_bag -> -734  + concrete_int_bag -> -733  + concrete_int_bag -> -732  + concrete_int_bag -> -1146  + concrete_int_bag -> -730  + concrete_int_bag -> -911  + concrete_int_bag -> -728  + concrete_int_bag -> -727  + concrete_int_bag -> -726  + concrete_int_bag -> -1145  + concrete_int_bag -> -724  + concrete_int_bag -> -803  + concrete_int_bag -> -1144  + concrete_int_bag -> -1143  + concrete_int_bag -> -1142  + concrete_int_bag -> -1141  + concrete_int_bag -> -1140  + concrete_int_bag -> -1139  + concrete_int_bag -> -797  + concrete_int_bag -> -1138  + concrete_int_bag -> -1137  + concrete_int_bag -> -795  + concrete_int_bag -> -1136  + concrete_int_bag -> -909  + concrete_int_bag -> -227  + concrete_int_bag -> -1135  + concrete_int_bag -> -1134  + concrete_int_bag -> -1133  + concrete_int_bag -> -791  + concrete_int_bag -> -1132  + concrete_int_bag -> -74  + concrete_int_bag -> -1131  + concrete_int_bag -> -1130  + concrete_int_bag -> -1129  + concrete_int_bag -> -1000  + concrete_int_bag -> -1128  + concrete_int_bag -> -89  + concrete_int_bag -> -1127  + concrete_int_bag -> -839  + concrete_int_bag -> -785  + concrete_int_bag -> -1126  + concrete_int_bag -> -1125  + concrete_int_bag -> -923  + concrete_int_bag -> -1124  + concrete_int_bag -> -1123  + concrete_int_bag -> -1122  + concrete_int_bag -> -1121  + concrete_int_bag -> -779  + concrete_int_bag -> -1120  + concrete_int_bag -> -1119  + concrete_int_bag -> -1118  + concrete_int_bag -> -776  + concrete_int_bag -> -1117  + concrete_int_bag -> -113  + concrete_int_bag -> -155  + concrete_int_bag -> -1116  + concrete_int_bag -> -905  + concrete_int_bag -> -1115  + concrete_int_bag -> -773  + concrete_int_bag -> -1114  + concrete_int_bag -> -1113  + concrete_int_bag -> -863  + concrete_int_bag -> -1112  + concrete_int_bag -> -1111  + concrete_int_bag -> -1110  + concrete_int_bag -> -1109  + concrete_int_bag -> -767  + concrete_int_bag -> -1108  + concrete_int_bag -> -1107  + concrete_int_bag -> -1106  + concrete_int_bag -> -221  + concrete_int_bag -> -1105  + concrete_int_bag -> -1104  + concrete_int_bag -> -17  + concrete_int_bag -> -999  + concrete_int_bag -> -167  + concrete_int_bag -> -1103  + concrete_int_bag -> -761  + concrete_int_bag -> -1102  + concrete_int_bag -> -1101  + concrete_int_bag -> -1100  + concrete_int_bag -> -1099  + concrete_int_bag -> -757  + concrete_int_bag -> -1098  + concrete_int_bag -> -83  + concrete_int_bag -> -1097  + concrete_int_bag -> -833  + concrete_int_bag -> -755  + concrete_int_bag -> -1096  + concrete_int_bag -> -1095  + concrete_int_bag -> -1094  + concrete_int_bag -> -1093  + concrete_int_bag -> -1092  + concrete_int_bag -> -1091  + concrete_int_bag -> -749  + concrete_int_bag -> -1090  + concrete_int_bag -> -1089  + concrete_int_bag -> -13  + concrete_int_bag -> -1088  + concrete_int_bag -> -1087  + concrete_int_bag -> -149  + concrete_int_bag -> -1086  + concrete_int_bag -> -899  + concrete_int_bag -> -1085  + concrete_int_bag -> -743  + concrete_int_bag -> -1084  + concrete_int_bag -> -1083  + concrete_int_bag -> -1082  + concrete_int_bag -> -1081  + concrete_int_bag -> -1080  + concrete_int_bag -> -47  + concrete_int_bag -> -77  + concrete_int_bag -> -1079  + concrete_int_bag -> -998  + concrete_int_bag -> -737  + concrete_int_bag -> -1078  + concrete_int_bag -> -1077  + concrete_int_bag -> -1076  + concrete_int_bag -> -215  + concrete_int_bag -> -1075  + concrete_int_bag -> -1074  + concrete_int_bag -> -298  + concrete_int_bag -> -297  + concrete_int_bag -> -296  + concrete_int_bag -> -295  + concrete_int_bag -> -294  + concrete_int_bag -> -1073  + concrete_int_bag -> -292  + concrete_int_bag -> -291  + concrete_int_bag -> -290  + concrete_int_bag -> -731  + concrete_int_bag -> -288  + concrete_int_bag -> -1072  + concrete_int_bag -> -286  + concrete_int_bag -> -285  + concrete_int_bag -> -284  + concrete_int_bag -> -283  + concrete_int_bag -> -282  + concrete_int_bag -> -1071  + concrete_int_bag -> -280  + concrete_int_bag -> -279  + concrete_int_bag -> -278  + concrete_int_bag -> -729  + concrete_int_bag -> -1003  + concrete_int_bag -> -1070  + concrete_int_bag -> -274  + concrete_int_bag -> -273  + concrete_int_bag -> -272  + concrete_int_bag -> -271  + concrete_int_bag -> -270  + concrete_int_bag -> -1069  + concrete_int_bag -> -268  + concrete_int_bag -> -267  + concrete_int_bag -> -266  + concrete_int_bag -> -265  + concrete_int_bag -> -264  + concrete_int_bag -> -1068  + concrete_int_bag -> -262  + concrete_int_bag -> -261  + concrete_int_bag -> -260  + concrete_int_bag -> -259  + concrete_int_bag -> -258  + concrete_int_bag -> -1067  + concrete_int_bag -> -256  + concrete_int_bag -> -255  + concrete_int_bag -> -827  + concrete_int_bag -> -725  + concrete_int_bag -> -252  + concrete_int_bag -> -1066  + concrete_int_bag -> -250  + concrete_int_bag -> -249  + concrete_int_bag -> -248  + concrete_int_bag -> -247  + concrete_int_bag -> -1018  + concrete_int_bag -> -1065  + concrete_int_bag -> -244  + concrete_int_bag -> -243  + concrete_int_bag -> -242  + concrete_int_bag -> -241  + concrete_int_bag -> -240  + concrete_int_bag -> -1064  + concrete_int_bag -> -238  + concrete_int_bag -> -237  + concrete_int_bag -> -236  + concrete_int_bag -> -235  + concrete_int_bag -> -234  + concrete_int_bag -> -1063  + concrete_int_bag -> -232  + concrete_int_bag -> -231  + concrete_int_bag -> -230  + concrete_int_bag -> -229  + concrete_int_bag -> -228  + concrete_int_bag -> -1062  + concrete_int_bag -> -226  + concrete_int_bag -> -225  + concrete_int_bag -> -224  + concrete_int_bag -> -223  + concrete_int_bag -> -222  + concrete_int_bag -> -1061  + concrete_int_bag -> -220  + concrete_int_bag -> -219  + concrete_int_bag -> -218  + concrete_int_bag -> -217  + concrete_int_bag -> -216  + concrete_int_bag -> -1060  + concrete_int_bag -> -214  + concrete_int_bag -> -213  + concrete_int_bag -> -212  + concrete_int_bag -> -211  + concrete_int_bag -> -210  + concrete_int_bag -> -1059  + concrete_int_bag -> -208  + concrete_int_bag -> -207  + concrete_int_bag -> -206  + concrete_int_bag -> -205  + concrete_int_bag -> -204  + concrete_int_bag -> -1058  + concrete_int_bag -> -202  + concrete_int_bag -> -201  + concrete_int_bag -> -200  + concrete_int_bag -> -199  + concrete_int_bag -> -198  + concrete_int_bag -> -1057  + concrete_int_bag -> -196  + concrete_int_bag -> -195  + concrete_int_bag -> -194  + concrete_int_bag -> -193  + concrete_int_bag -> -192  + concrete_int_bag -> -1056  + concrete_int_bag -> -190  + concrete_int_bag -> -189  + concrete_int_bag -> -893  + concrete_int_bag -> -187  + concrete_int_bag -> -186  + concrete_int_bag -> -1055  + concrete_int_bag -> -184  + concrete_int_bag -> -183  + concrete_int_bag -> -182  + concrete_int_bag -> -181  + concrete_int_bag -> -180  + concrete_int_bag -> -1054  + concrete_int_bag -> -178  + concrete_int_bag -> -177  + concrete_int_bag -> -997  + concrete_int_bag -> -175  + concrete_int_bag -> -174  + concrete_int_bag -> -1053  + concrete_int_bag -> -172  + concrete_int_bag -> -171  + concrete_int_bag -> -170  + concrete_int_bag -> -169  + concrete_int_bag -> -168  + concrete_int_bag -> -1052  + concrete_int_bag -> -166  + concrete_int_bag -> -165  + concrete_int_bag -> -164  + concrete_int_bag -> -163  + concrete_int_bag -> -162  + concrete_int_bag -> -1051  + concrete_int_bag -> -160  + concrete_int_bag -> -159  + concrete_int_bag -> -158  + concrete_int_bag -> -157  + concrete_int_bag -> -156  + concrete_int_bag -> -1050  + concrete_int_bag -> -154  + concrete_int_bag -> -153  + concrete_int_bag -> -152  + concrete_int_bag -> -151  + concrete_int_bag -> -150  + concrete_int_bag -> -1049  + concrete_int_bag -> -148  + concrete_int_bag -> -147  + concrete_int_bag -> -146  + concrete_int_bag -> -145  + concrete_int_bag -> -233  + concrete_int_bag -> -1048  + concrete_int_bag -> -142  + concrete_int_bag -> -141  + concrete_int_bag -> -140  + concrete_int_bag -> -139  + concrete_int_bag -> -138  + concrete_int_bag -> -1047  + concrete_int_bag -> -136  + concrete_int_bag -> -135  + concrete_int_bag -> -134  + concrete_int_bag -> -133  + concrete_int_bag -> -132  + concrete_int_bag -> -1046  + concrete_int_bag -> -130  + concrete_int_bag -> -129  + concrete_int_bag -> -128  + concrete_int_bag -> -209  + concrete_int_bag -> -126  + concrete_int_bag -> -1045  + concrete_int_bag -> -124  + concrete_int_bag -> -123  + concrete_int_bag -> -122  + concrete_int_bag -> -121  + concrete_int_bag -> -120  + concrete_int_bag -> -1044  + concrete_int_bag -> -118  + concrete_int_bag -> -117  + concrete_int_bag -> -116  + concrete_int_bag -> -115  + concrete_int_bag -> -114  + concrete_int_bag -> -1043  + concrete_int_bag -> -112  + concrete_int_bag -> -111  + concrete_int_bag -> -110  + concrete_int_bag -> -109  + concrete_int_bag -> -108  + concrete_int_bag -> -1042  + concrete_int_bag -> -106  + concrete_int_bag -> -105  + concrete_int_bag -> -104  + concrete_int_bag -> -103  + concrete_int_bag -> -102  + concrete_int_bag -> -1041  + concrete_int_bag -> -100  + concrete_int_bag -> -99  + concrete_int_bag -> -98  + concrete_int_bag -> -97  + concrete_int_bag -> -96  + concrete_int_bag -> -1040  + concrete_int_bag -> -94  + concrete_int_bag -> -93  + concrete_int_bag -> -92  + concrete_int_bag -> -91  + concrete_int_bag -> -90  + concrete_int_bag -> -1039  + concrete_int_bag -> -88  + concrete_int_bag -> -87  + concrete_int_bag -> -86  + concrete_int_bag -> -85  + concrete_int_bag -> -84  + concrete_int_bag -> -1038  + concrete_int_bag -> -82  + concrete_int_bag -> -81  + concrete_int_bag -> -80  + concrete_int_bag -> -79  + concrete_int_bag -> -78  + concrete_int_bag -> -1037  + concrete_int_bag -> -76  + concrete_int_bag -> -75  + concrete_int_bag -> -821  + concrete_int_bag -> -73  + concrete_int_bag -> -72  + concrete_int_bag -> -1036  + concrete_int_bag -> -70  + concrete_int_bag -> -69  + concrete_int_bag -> -68  + concrete_int_bag -> -67  + concrete_int_bag -> -66  + concrete_int_bag -> -1035  + concrete_int_bag -> -64  + concrete_int_bag -> -63  + concrete_int_bag -> -62  + concrete_int_bag -> -61  + concrete_int_bag -> -60  + concrete_int_bag -> -1034  + concrete_int_bag -> -58  + concrete_int_bag -> -57  + concrete_int_bag -> -56  + concrete_int_bag -> -55  + concrete_int_bag -> -54  + concrete_int_bag -> -1033  + concrete_int_bag -> -52  + concrete_int_bag -> -51  + concrete_int_bag -> -50  + concrete_int_bag -> -49  + concrete_int_bag -> -48  + concrete_int_bag -> -1032  + concrete_int_bag -> -46  + concrete_int_bag -> -45  + concrete_int_bag -> -44  + concrete_int_bag -> -43  + concrete_int_bag -> -42  + concrete_int_bag -> -1031  + concrete_int_bag -> -40  + concrete_int_bag -> -39  + concrete_int_bag -> -38  + concrete_int_bag -> -37  + concrete_int_bag -> -36  + concrete_int_bag -> -1030  + concrete_int_bag -> -34  + concrete_int_bag -> -33  + concrete_int_bag -> -32  + concrete_int_bag -> -31  + concrete_int_bag -> -1029  + concrete_int_bag -> -28  + concrete_int_bag -> -26  + concrete_int_bag -> -25  + concrete_int_bag -> -24  + concrete_int_bag -> -1028  + concrete_int_bag -> -22  + concrete_int_bag -> -21  + concrete_int_bag -> -19  + concrete_int_bag -> -1027  + concrete_int_bag -> -137  + concrete_int_bag -> -12  + concrete_int_bag -> -1026  + concrete_int_bag -> -887  + concrete_int_bag -> -6  + concrete_int_bag -> -1025 
   , c4_OperatingSystemCharacteristics in partial_c4_OperatingSystemCharacteristics
   , c10_SQLITE_4_BYTE_ALIGNED_MALLOC in partial_c10_SQLITE_4_BYTE_ALIGNED_MALLOC
   , c16_SQLITE_CASE_SENSITIVE_LIKE in partial_c16_SQLITE_CASE_SENSITIVE_LIKE
   , c22_SQLITE_HAVE_ISNAN in partial_c22_SQLITE_HAVE_ISNAN
   , c28_SQLITE_SECURE_DELETE in partial_c28_SQLITE_SECURE_DELETE
   , c34_ChooseSQLITE_TEMP_STORE in partial_c34_ChooseSQLITE_TEMP_STORE
   , c40_SQLITE_TEMP_STORE_EQ_0 in partial_c40_SQLITE_TEMP_STORE_EQ_0
   , c46_SQLITE_TEMP_STORE_EQ_1 in partial_c46_SQLITE_TEMP_STORE_EQ_1
   , c52_SQLITE_TEMP_STORE_EQ_2 in partial_c52_SQLITE_TEMP_STORE_EQ_2
   , c58_SQLITE_TEMP_STORE_EQ_3 in partial_c58_SQLITE_TEMP_STORE_EQ_3
   , c64_EnableFeatures in partial_c64_EnableFeatures
   , c70_SQLITE_ENABLE_ATOMIC_WRITE in partial_c70_SQLITE_ENABLE_ATOMIC_WRITE
   , c76_SQLITE_ENABLE_COLUMN_METADATA in partial_c76_SQLITE_ENABLE_COLUMN_METADATA
   , c84_SQLITE_ENABLE_FTS3 in partial_c84_SQLITE_ENABLE_FTS3
   , c90_SQLITE_ENABLE_FTS3_PARENTHESIS in partial_c90_SQLITE_ENABLE_FTS3_PARENTHESIS
   , c96_SQLITE_ENABLE_MEMORY_MANAGEMENT in partial_c96_SQLITE_ENABLE_MEMORY_MANAGEMENT
   , c102_ChooseMemSys in partial_c102_ChooseMemSys
   , c108_SQLITE_ENABLE_MEMSYS3 in partial_c108_SQLITE_ENABLE_MEMSYS3
   , c114_SQLITE_ENABLE_MEMSYS5 in partial_c114_SQLITE_ENABLE_MEMSYS5
   , c120_SQLITE_ENABLE_RTREE in partial_c120_SQLITE_ENABLE_RTREE
   , c126_SQLITE_ENABLE_STAT2 in partial_c126_SQLITE_ENABLE_STAT2
   , c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT in partial_c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT
   , c138_SQLITE_ENABLE_UNLOCK_NOTIFY in partial_c138_SQLITE_ENABLE_UNLOCK_NOTIFY
   , c144_SQLITE_SOUNDEX in partial_c144_SQLITE_SOUNDEX
   , c150_YYTRACKMAXSTACKDEPTH in partial_c150_YYTRACKMAXSTACKDEPTH
   , c156_DisableFeatures in partial_c156_DisableFeatures
   , c162_SQLITE_DISABLE_LFS in partial_c162_SQLITE_DISABLE_LFS
   , c168_SQLITE_DISABLE_DIRSYNC in partial_c168_SQLITE_DISABLE_DIRSYNC
   , c174_OmitFeatures in partial_c174_OmitFeatures
   , c180_SQLITE_OMIT_ALTERTABLE in partial_c180_SQLITE_OMIT_ALTERTABLE
   , c187_SQLITE_OMIT_ANALYZE in partial_c187_SQLITE_OMIT_ANALYZE
   , c194_SQLITE_OMIT_ATTACH in partial_c194_SQLITE_OMIT_ATTACH
   , c201_SQLITE_OMIT_AUTHORIZATION in partial_c201_SQLITE_OMIT_AUTHORIZATION
   , c208_SQLITE_OMIT_AUTOINCREMENT in partial_c208_SQLITE_OMIT_AUTOINCREMENT
   , c215_SQLITE_OMIT_AUTOMATIC_INDEX in partial_c215_SQLITE_OMIT_AUTOMATIC_INDEX
   , c222_SQLITE_OMIT_AUTOINIT in partial_c222_SQLITE_OMIT_AUTOINIT
   , c228_SQLITE_OMIT_AUTOVACUUM in partial_c228_SQLITE_OMIT_AUTOVACUUM
   , c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION in partial_c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION
   , c241_SQLITE_OMIT_BLOB_LITERAL in partial_c241_SQLITE_OMIT_BLOB_LITERAL
   , c248_SQLITE_OMIT_BTREECOUNT in partial_c248_SQLITE_OMIT_BTREECOUNT
   , c255_SQLITE_OMIT_BUILTIN_TEST in partial_c255_SQLITE_OMIT_BUILTIN_TEST
   , c262_SQLITE_OMIT_CAST in partial_c262_SQLITE_OMIT_CAST
   , c269_SQLITE_OMIT_CHECK in partial_c269_SQLITE_OMIT_CHECK
   , c276_SQLITE_OMIT_COMPILEOPTION_DIAGS in partial_c276_SQLITE_OMIT_COMPILEOPTION_DIAGS
   , c283_SQLITE_OMIT_COMPLETE in partial_c283_SQLITE_OMIT_COMPLETE
   , c290_SQLITE_OMIT_COMPOUND_SELECT in partial_c290_SQLITE_OMIT_COMPOUND_SELECT
   , c297_SQLITE_OMIT_CONFLICT_CLAUSE in partial_c297_SQLITE_OMIT_CONFLICT_CLAUSE
   , c303_SQLITE_OMIT_DATETIME_FUNCS in partial_c303_SQLITE_OMIT_DATETIME_FUNCS
   , c310_SQLITE_OMIT_DECLTYPE in partial_c310_SQLITE_OMIT_DECLTYPE
   , c319_SQLITE_OMIT_DEPRECATED in partial_c319_SQLITE_OMIT_DEPRECATED
   , c326_SQLITE_OMIT_EXPLAIN in partial_c326_SQLITE_OMIT_EXPLAIN
   , c333_SQLITE_OMIT_FLAG_PRAGMAS in partial_c333_SQLITE_OMIT_FLAG_PRAGMAS
   , c340_SQLITE_OMIT_FLOATING_POINT in partial_c340_SQLITE_OMIT_FLOATING_POINT
   , c347_SQLITE_OMIT_FOREIGN_KEY in partial_c347_SQLITE_OMIT_FOREIGN_KEY
   , c354_SQLITE_OMIT_GET_TABLE in partial_c354_SQLITE_OMIT_GET_TABLE
   , c361_SQLITE_OMIT_INCRBLOB in partial_c361_SQLITE_OMIT_INCRBLOB
   , c368_SQLITE_OMIT_INTEGRITY_CHECK in partial_c368_SQLITE_OMIT_INTEGRITY_CHECK
   , c375_SQLITE_OMIT_LIKE_OPTIMIZATION in partial_c375_SQLITE_OMIT_LIKE_OPTIMIZATION
   , c382_SQLITE_OMIT_LOAD_EXTENSION in partial_c382_SQLITE_OMIT_LOAD_EXTENSION
   , c389_SQLITE_OMIT_LOCALTIME in partial_c389_SQLITE_OMIT_LOCALTIME
   , c396_SQLITE_OMIT_LOOKASIDE in partial_c396_SQLITE_OMIT_LOOKASIDE
   , c403_SQLITE_OMIT_MEMORYDB in partial_c403_SQLITE_OMIT_MEMORYDB
   , c410_SQLITE_OMIT_OR_OPTIMIZATION in partial_c410_SQLITE_OMIT_OR_OPTIMIZATION
   , c417_SQLITE_OMIT_PAGER_PRAGMAS in partial_c417_SQLITE_OMIT_PAGER_PRAGMAS
   , c424_SQLITE_OMIT_PRAGMA in partial_c424_SQLITE_OMIT_PRAGMA
   , c431_SQLITE_OMIT_PROGRESS_CALLBACK in partial_c431_SQLITE_OMIT_PROGRESS_CALLBACK
   , c438_SQLITE_OMIT_QUICKBALANCE in partial_c438_SQLITE_OMIT_QUICKBALANCE
   , c445_SQLITE_OMIT_REINDEX in partial_c445_SQLITE_OMIT_REINDEX
   , c452_SQLITE_OMIT_SCHEMA_PRAGMAS in partial_c452_SQLITE_OMIT_SCHEMA_PRAGMAS
   , c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS in partial_c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS
   , c466_SQLITE_OMIT_SHARED_CACHE in partial_c466_SQLITE_OMIT_SHARED_CACHE
   , c473_SQLITE_OMIT_SUBQUERY in partial_c473_SQLITE_OMIT_SUBQUERY
   , c480_SQLITE_OMIT_TCL_VARIABLE in partial_c480_SQLITE_OMIT_TCL_VARIABLE
   , c486_SQLITE_OMIT_TEMPDB in partial_c486_SQLITE_OMIT_TEMPDB
   , c492_SQLITE_OMIT_TRACE in partial_c492_SQLITE_OMIT_TRACE
   , c499_SQLITE_OMIT_TRIGGER in partial_c499_SQLITE_OMIT_TRIGGER
   , c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION in partial_c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION
   , c512_SQLITE_OMIT_UTF16 in partial_c512_SQLITE_OMIT_UTF16
   , c519_SQLITE_OMIT_VACUUM in partial_c519_SQLITE_OMIT_VACUUM
   , c526_SQLITE_OMIT_VIEW in partial_c526_SQLITE_OMIT_VIEW
   , c533_SQLITE_OMIT_VIRTUALTABLE in partial_c533_SQLITE_OMIT_VIRTUALTABLE
   , c540_SQLITE_OMIT_WAL in partial_c540_SQLITE_OMIT_WAL
   , c547_SQLITE_OMIT_XFER_OPT in partial_c547_SQLITE_OMIT_XFER_OPT
   , c554_SQLITE_DEBUG in partial_c554_SQLITE_DEBUG
   , c560_SQLITE_MEMDEBUG in partial_c560_SQLITE_MEMDEBUG
    ,  c2_footprint in footprint_for_c4_OperatingSystemCharacteristics_of_888 + footprint_for_c10_SQLITE_4_BYTE_ALIGNED_MALLOC_of_0 + footprint_for_c16_SQLITE_CASE_SENSITIVE_LIKE_of_0 + footprint_for_c22_SQLITE_HAVE_ISNAN_of_0 + footprint_for_c28_SQLITE_SECURE_DELETE_of_0 + footprint_for_c34_ChooseSQLITE_TEMP_STORE_of_0 + footprint_for_c40_SQLITE_TEMP_STORE_EQ_0_of_0 + footprint_for_c46_SQLITE_TEMP_STORE_EQ_1_of_0 + footprint_for_c52_SQLITE_TEMP_STORE_EQ_2_of_0 + footprint_for_c58_SQLITE_TEMP_STORE_EQ_3_of_0 + footprint_for_c64_EnableFeatures_of_0 + footprint_for_c70_SQLITE_ENABLE_ATOMIC_WRITE_of_3 + footprint_for_c76_SQLITE_ENABLE_COLUMN_METADATA_of_2 + footprint_for_c84_SQLITE_ENABLE_FTS3_of_100 + footprint_for_c90_SQLITE_ENABLE_FTS3_PARENTHESIS_of_0 + footprint_for_c96_SQLITE_ENABLE_MEMORY_MANAGEMENT_of_1 + footprint_for_c102_ChooseMemSys_of_3 + footprint_for_c108_SQLITE_ENABLE_MEMSYS3_of_2 + footprint_for_c114_SQLITE_ENABLE_MEMSYS5_of_0 + footprint_for_c120_SQLITE_ENABLE_RTREE_of_33 + footprint_for_c126_SQLITE_ENABLE_STAT2_of_4 + footprint_for_c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT_of_1 + footprint_for_c138_SQLITE_ENABLE_UNLOCK_NOTIFY_of_3 + footprint_for_c144_SQLITE_SOUNDEX_of_1 + footprint_for_c150_YYTRACKMAXSTACKDEPTH_of_0 + footprint_for_c156_DisableFeatures_of_0 + footprint_for_c162_SQLITE_DISABLE_LFS_of_0 + footprint_for_c168_SQLITE_DISABLE_DIRSYNC_of_0 + footprint_for_c174_OmitFeatures_of_0 + footprint_for_c180_SQLITE_OMIT_ALTERTABLE_of_minus7 + footprint_for_c187_SQLITE_OMIT_ANALYZE_of_minus5 + footprint_for_c194_SQLITE_OMIT_ATTACH_of_minus8 + footprint_for_c201_SQLITE_OMIT_AUTHORIZATION_of_minus5 + footprint_for_c208_SQLITE_OMIT_AUTOINCREMENT_of_minus3 + footprint_for_c215_SQLITE_OMIT_AUTOMATIC_INDEX_of_minus4 + footprint_for_c222_SQLITE_OMIT_AUTOINIT_of_0 + footprint_for_c228_SQLITE_OMIT_AUTOVACUUM_of_minus14 + footprint_for_c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION_of_0 + footprint_for_c241_SQLITE_OMIT_BLOB_LITERAL_of_minus1 + footprint_for_c248_SQLITE_OMIT_BTREECOUNT_of_minus2 + footprint_for_c255_SQLITE_OMIT_BUILTIN_TEST_of_minus2 + footprint_for_c262_SQLITE_OMIT_CAST_of_minus1 + footprint_for_c269_SQLITE_OMIT_CHECK_of_minus1 + footprint_for_c276_SQLITE_OMIT_COMPILEOPTION_DIAGS_of_minus1 + footprint_for_c283_SQLITE_OMIT_COMPLETE_of_minus888 + footprint_for_c290_SQLITE_OMIT_COMPOUND_SELECT_of_minus10 + footprint_for_c297_SQLITE_OMIT_CONFLICT_CLAUSE_of_0 + footprint_for_c303_SQLITE_OMIT_DATETIME_FUNCS_of_minus10 + footprint_for_c310_SQLITE_OMIT_DECLTYPE_of_minus1 + footprint_for_c319_SQLITE_OMIT_DEPRECATED_of_minus1 + footprint_for_c326_SQLITE_OMIT_EXPLAIN_of_minus10 + footprint_for_c333_SQLITE_OMIT_FLAG_PRAGMAS_of_minus1 + footprint_for_c340_SQLITE_OMIT_FLOATING_POINT_of_minus18 + footprint_for_c347_SQLITE_OMIT_FOREIGN_KEY_of_minus15 + footprint_for_c354_SQLITE_OMIT_GET_TABLE_of_minus3 + footprint_for_c361_SQLITE_OMIT_INCRBLOB_of_minus7 + footprint_for_c368_SQLITE_OMIT_INTEGRITY_CHECK_of_minus9 + footprint_for_c375_SQLITE_OMIT_LIKE_OPTIMIZATION_of_minus2 + footprint_for_c382_SQLITE_OMIT_LOAD_EXTENSION_of_minus3 + footprint_for_c389_SQLITE_OMIT_LOCALTIME_of_minus1 + footprint_for_c396_SQLITE_OMIT_LOOKASIDE_of_minus1 + footprint_for_c403_SQLITE_OMIT_MEMORYDB_of_minus2 + footprint_for_c410_SQLITE_OMIT_OR_OPTIMIZATION_of_minus5 + footprint_for_c417_SQLITE_OMIT_PAGER_PRAGMAS_of_minus5 + footprint_for_c424_SQLITE_OMIT_PRAGMA_of_minus16 + footprint_for_c431_SQLITE_OMIT_PROGRESS_CALLBACK_of_minus1 + footprint_for_c438_SQLITE_OMIT_QUICKBALANCE_of_minus1 + footprint_for_c445_SQLITE_OMIT_REINDEX_of_minus1 + footprint_for_c452_SQLITE_OMIT_SCHEMA_PRAGMAS_of_minus2 + footprint_for_c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS_of_minus1 + footprint_for_c466_SQLITE_OMIT_SHARED_CACHE_of_minus10 + footprint_for_c473_SQLITE_OMIT_SUBQUERY_of_minus11 + footprint_for_c480_SQLITE_OMIT_TCL_VARIABLE_of_0 + footprint_for_c486_SQLITE_OMIT_TEMPDB_of_0 + footprint_for_c492_SQLITE_OMIT_TRACE_of_minus3 + footprint_for_c499_SQLITE_OMIT_TRIGGER_of_minus27 + footprint_for_c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION_of_0 + footprint_for_c512_SQLITE_OMIT_UTF16_of_minus8 + footprint_for_c519_SQLITE_OMIT_VACUUM_of_minus4 + footprint_for_c526_SQLITE_OMIT_VIEW_of_minus3 + footprint_for_c533_SQLITE_OMIT_VIRTUALTABLE_of_minus20 + footprint_for_c540_SQLITE_OMIT_WAL_of_minus30 + footprint_for_c547_SQLITE_OMIT_XFER_OPT_of_minus3 + footprint_for_c554_SQLITE_DEBUG_of_9 + footprint_for_c560_SQLITE_MEMDEBUG_of_2
    , r_c2_footprint in partial_c4_OperatingSystemCharacteristics->footprint_for_c4_OperatingSystemCharacteristics_of_888 + partial_c10_SQLITE_4_BYTE_ALIGNED_MALLOC->footprint_for_c10_SQLITE_4_BYTE_ALIGNED_MALLOC_of_0 + partial_c16_SQLITE_CASE_SENSITIVE_LIKE->footprint_for_c16_SQLITE_CASE_SENSITIVE_LIKE_of_0 + partial_c22_SQLITE_HAVE_ISNAN->footprint_for_c22_SQLITE_HAVE_ISNAN_of_0 + partial_c28_SQLITE_SECURE_DELETE->footprint_for_c28_SQLITE_SECURE_DELETE_of_0 + partial_c34_ChooseSQLITE_TEMP_STORE->footprint_for_c34_ChooseSQLITE_TEMP_STORE_of_0 + partial_c40_SQLITE_TEMP_STORE_EQ_0->footprint_for_c40_SQLITE_TEMP_STORE_EQ_0_of_0 + partial_c46_SQLITE_TEMP_STORE_EQ_1->footprint_for_c46_SQLITE_TEMP_STORE_EQ_1_of_0 + partial_c52_SQLITE_TEMP_STORE_EQ_2->footprint_for_c52_SQLITE_TEMP_STORE_EQ_2_of_0 + partial_c58_SQLITE_TEMP_STORE_EQ_3->footprint_for_c58_SQLITE_TEMP_STORE_EQ_3_of_0 + partial_c64_EnableFeatures->footprint_for_c64_EnableFeatures_of_0 + partial_c70_SQLITE_ENABLE_ATOMIC_WRITE->footprint_for_c70_SQLITE_ENABLE_ATOMIC_WRITE_of_3 + partial_c76_SQLITE_ENABLE_COLUMN_METADATA->footprint_for_c76_SQLITE_ENABLE_COLUMN_METADATA_of_2 + partial_c84_SQLITE_ENABLE_FTS3->footprint_for_c84_SQLITE_ENABLE_FTS3_of_100 + partial_c90_SQLITE_ENABLE_FTS3_PARENTHESIS->footprint_for_c90_SQLITE_ENABLE_FTS3_PARENTHESIS_of_0 + partial_c96_SQLITE_ENABLE_MEMORY_MANAGEMENT->footprint_for_c96_SQLITE_ENABLE_MEMORY_MANAGEMENT_of_1 + partial_c102_ChooseMemSys->footprint_for_c102_ChooseMemSys_of_3 + partial_c108_SQLITE_ENABLE_MEMSYS3->footprint_for_c108_SQLITE_ENABLE_MEMSYS3_of_2 + partial_c114_SQLITE_ENABLE_MEMSYS5->footprint_for_c114_SQLITE_ENABLE_MEMSYS5_of_0 + partial_c120_SQLITE_ENABLE_RTREE->footprint_for_c120_SQLITE_ENABLE_RTREE_of_33 + partial_c126_SQLITE_ENABLE_STAT2->footprint_for_c126_SQLITE_ENABLE_STAT2_of_4 + partial_c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT->footprint_for_c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT_of_1 + partial_c138_SQLITE_ENABLE_UNLOCK_NOTIFY->footprint_for_c138_SQLITE_ENABLE_UNLOCK_NOTIFY_of_3 + partial_c144_SQLITE_SOUNDEX->footprint_for_c144_SQLITE_SOUNDEX_of_1 + partial_c150_YYTRACKMAXSTACKDEPTH->footprint_for_c150_YYTRACKMAXSTACKDEPTH_of_0 + partial_c156_DisableFeatures->footprint_for_c156_DisableFeatures_of_0 + partial_c162_SQLITE_DISABLE_LFS->footprint_for_c162_SQLITE_DISABLE_LFS_of_0 + partial_c168_SQLITE_DISABLE_DIRSYNC->footprint_for_c168_SQLITE_DISABLE_DIRSYNC_of_0 + partial_c174_OmitFeatures->footprint_for_c174_OmitFeatures_of_0 + partial_c180_SQLITE_OMIT_ALTERTABLE->footprint_for_c180_SQLITE_OMIT_ALTERTABLE_of_minus7 + partial_c187_SQLITE_OMIT_ANALYZE->footprint_for_c187_SQLITE_OMIT_ANALYZE_of_minus5 + partial_c194_SQLITE_OMIT_ATTACH->footprint_for_c194_SQLITE_OMIT_ATTACH_of_minus8 + partial_c201_SQLITE_OMIT_AUTHORIZATION->footprint_for_c201_SQLITE_OMIT_AUTHORIZATION_of_minus5 + partial_c208_SQLITE_OMIT_AUTOINCREMENT->footprint_for_c208_SQLITE_OMIT_AUTOINCREMENT_of_minus3 + partial_c215_SQLITE_OMIT_AUTOMATIC_INDEX->footprint_for_c215_SQLITE_OMIT_AUTOMATIC_INDEX_of_minus4 + partial_c222_SQLITE_OMIT_AUTOINIT->footprint_for_c222_SQLITE_OMIT_AUTOINIT_of_0 + partial_c228_SQLITE_OMIT_AUTOVACUUM->footprint_for_c228_SQLITE_OMIT_AUTOVACUUM_of_minus14 + partial_c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION->footprint_for_c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION_of_0 + partial_c241_SQLITE_OMIT_BLOB_LITERAL->footprint_for_c241_SQLITE_OMIT_BLOB_LITERAL_of_minus1 + partial_c248_SQLITE_OMIT_BTREECOUNT->footprint_for_c248_SQLITE_OMIT_BTREECOUNT_of_minus2 + partial_c255_SQLITE_OMIT_BUILTIN_TEST->footprint_for_c255_SQLITE_OMIT_BUILTIN_TEST_of_minus2 + partial_c262_SQLITE_OMIT_CAST->footprint_for_c262_SQLITE_OMIT_CAST_of_minus1 + partial_c269_SQLITE_OMIT_CHECK->footprint_for_c269_SQLITE_OMIT_CHECK_of_minus1 + partial_c276_SQLITE_OMIT_COMPILEOPTION_DIAGS->footprint_for_c276_SQLITE_OMIT_COMPILEOPTION_DIAGS_of_minus1 + partial_c283_SQLITE_OMIT_COMPLETE->footprint_for_c283_SQLITE_OMIT_COMPLETE_of_minus888 + partial_c290_SQLITE_OMIT_COMPOUND_SELECT->footprint_for_c290_SQLITE_OMIT_COMPOUND_SELECT_of_minus10 + partial_c297_SQLITE_OMIT_CONFLICT_CLAUSE->footprint_for_c297_SQLITE_OMIT_CONFLICT_CLAUSE_of_0 + partial_c303_SQLITE_OMIT_DATETIME_FUNCS->footprint_for_c303_SQLITE_OMIT_DATETIME_FUNCS_of_minus10 + partial_c310_SQLITE_OMIT_DECLTYPE->footprint_for_c310_SQLITE_OMIT_DECLTYPE_of_minus1 + partial_c319_SQLITE_OMIT_DEPRECATED->footprint_for_c319_SQLITE_OMIT_DEPRECATED_of_minus1 + partial_c326_SQLITE_OMIT_EXPLAIN->footprint_for_c326_SQLITE_OMIT_EXPLAIN_of_minus10 + partial_c333_SQLITE_OMIT_FLAG_PRAGMAS->footprint_for_c333_SQLITE_OMIT_FLAG_PRAGMAS_of_minus1 + partial_c340_SQLITE_OMIT_FLOATING_POINT->footprint_for_c340_SQLITE_OMIT_FLOATING_POINT_of_minus18 + partial_c347_SQLITE_OMIT_FOREIGN_KEY->footprint_for_c347_SQLITE_OMIT_FOREIGN_KEY_of_minus15 + partial_c354_SQLITE_OMIT_GET_TABLE->footprint_for_c354_SQLITE_OMIT_GET_TABLE_of_minus3 + partial_c361_SQLITE_OMIT_INCRBLOB->footprint_for_c361_SQLITE_OMIT_INCRBLOB_of_minus7 + partial_c368_SQLITE_OMIT_INTEGRITY_CHECK->footprint_for_c368_SQLITE_OMIT_INTEGRITY_CHECK_of_minus9 + partial_c375_SQLITE_OMIT_LIKE_OPTIMIZATION->footprint_for_c375_SQLITE_OMIT_LIKE_OPTIMIZATION_of_minus2 + partial_c382_SQLITE_OMIT_LOAD_EXTENSION->footprint_for_c382_SQLITE_OMIT_LOAD_EXTENSION_of_minus3 + partial_c389_SQLITE_OMIT_LOCALTIME->footprint_for_c389_SQLITE_OMIT_LOCALTIME_of_minus1 + partial_c396_SQLITE_OMIT_LOOKASIDE->footprint_for_c396_SQLITE_OMIT_LOOKASIDE_of_minus1 + partial_c403_SQLITE_OMIT_MEMORYDB->footprint_for_c403_SQLITE_OMIT_MEMORYDB_of_minus2 + partial_c410_SQLITE_OMIT_OR_OPTIMIZATION->footprint_for_c410_SQLITE_OMIT_OR_OPTIMIZATION_of_minus5 + partial_c417_SQLITE_OMIT_PAGER_PRAGMAS->footprint_for_c417_SQLITE_OMIT_PAGER_PRAGMAS_of_minus5 + partial_c424_SQLITE_OMIT_PRAGMA->footprint_for_c424_SQLITE_OMIT_PRAGMA_of_minus16 + partial_c431_SQLITE_OMIT_PROGRESS_CALLBACK->footprint_for_c431_SQLITE_OMIT_PROGRESS_CALLBACK_of_minus1 + partial_c438_SQLITE_OMIT_QUICKBALANCE->footprint_for_c438_SQLITE_OMIT_QUICKBALANCE_of_minus1 + partial_c445_SQLITE_OMIT_REINDEX->footprint_for_c445_SQLITE_OMIT_REINDEX_of_minus1 + partial_c452_SQLITE_OMIT_SCHEMA_PRAGMAS->footprint_for_c452_SQLITE_OMIT_SCHEMA_PRAGMAS_of_minus2 + partial_c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS->footprint_for_c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS_of_minus1 + partial_c466_SQLITE_OMIT_SHARED_CACHE->footprint_for_c466_SQLITE_OMIT_SHARED_CACHE_of_minus10 + partial_c473_SQLITE_OMIT_SUBQUERY->footprint_for_c473_SQLITE_OMIT_SUBQUERY_of_minus11 + partial_c480_SQLITE_OMIT_TCL_VARIABLE->footprint_for_c480_SQLITE_OMIT_TCL_VARIABLE_of_0 + partial_c486_SQLITE_OMIT_TEMPDB->footprint_for_c486_SQLITE_OMIT_TEMPDB_of_0 + partial_c492_SQLITE_OMIT_TRACE->footprint_for_c492_SQLITE_OMIT_TRACE_of_minus3 + partial_c499_SQLITE_OMIT_TRIGGER->footprint_for_c499_SQLITE_OMIT_TRIGGER_of_minus27 + partial_c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION->footprint_for_c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION_of_0 + partial_c512_SQLITE_OMIT_UTF16->footprint_for_c512_SQLITE_OMIT_UTF16_of_minus8 + partial_c519_SQLITE_OMIT_VACUUM->footprint_for_c519_SQLITE_OMIT_VACUUM_of_minus4 + partial_c526_SQLITE_OMIT_VIEW->footprint_for_c526_SQLITE_OMIT_VIEW_of_minus3 + partial_c533_SQLITE_OMIT_VIRTUALTABLE->footprint_for_c533_SQLITE_OMIT_VIRTUALTABLE_of_minus20 + partial_c540_SQLITE_OMIT_WAL->footprint_for_c540_SQLITE_OMIT_WAL_of_minus30 + partial_c547_SQLITE_OMIT_XFER_OPT->footprint_for_c547_SQLITE_OMIT_XFER_OPT_of_minus3 + partial_c554_SQLITE_DEBUG->footprint_for_c554_SQLITE_DEBUG_of_9 + partial_c560_SQLITE_MEMDEBUG->footprint_for_c560_SQLITE_MEMDEBUG_of_2
    , c2_footprint_ref in footprint_for_c4_OperatingSystemCharacteristics_of_888-> 888 + footprint_for_c10_SQLITE_4_BYTE_ALIGNED_MALLOC_of_0-> 0 + footprint_for_c16_SQLITE_CASE_SENSITIVE_LIKE_of_0-> 0 + footprint_for_c22_SQLITE_HAVE_ISNAN_of_0-> 0 + footprint_for_c28_SQLITE_SECURE_DELETE_of_0-> 0 + footprint_for_c34_ChooseSQLITE_TEMP_STORE_of_0-> 0 + footprint_for_c40_SQLITE_TEMP_STORE_EQ_0_of_0-> 0 + footprint_for_c46_SQLITE_TEMP_STORE_EQ_1_of_0-> 0 + footprint_for_c52_SQLITE_TEMP_STORE_EQ_2_of_0-> 0 + footprint_for_c58_SQLITE_TEMP_STORE_EQ_3_of_0-> 0 + footprint_for_c64_EnableFeatures_of_0-> 0 + footprint_for_c70_SQLITE_ENABLE_ATOMIC_WRITE_of_3-> 3 + footprint_for_c76_SQLITE_ENABLE_COLUMN_METADATA_of_2-> 2 + footprint_for_c84_SQLITE_ENABLE_FTS3_of_100-> 100 + footprint_for_c90_SQLITE_ENABLE_FTS3_PARENTHESIS_of_0-> 0 + footprint_for_c96_SQLITE_ENABLE_MEMORY_MANAGEMENT_of_1-> 1 + footprint_for_c102_ChooseMemSys_of_3-> 3 + footprint_for_c108_SQLITE_ENABLE_MEMSYS3_of_2-> 2 + footprint_for_c114_SQLITE_ENABLE_MEMSYS5_of_0-> 0 + footprint_for_c120_SQLITE_ENABLE_RTREE_of_33-> 33 + footprint_for_c126_SQLITE_ENABLE_STAT2_of_4-> 4 + footprint_for_c132_SQLITE_ENABLE_UPDATE_DELETE_LIMIT_of_1-> 1 + footprint_for_c138_SQLITE_ENABLE_UNLOCK_NOTIFY_of_3-> 3 + footprint_for_c144_SQLITE_SOUNDEX_of_1-> 1 + footprint_for_c150_YYTRACKMAXSTACKDEPTH_of_0-> 0 + footprint_for_c156_DisableFeatures_of_0-> 0 + footprint_for_c162_SQLITE_DISABLE_LFS_of_0-> 0 + footprint_for_c168_SQLITE_DISABLE_DIRSYNC_of_0-> 0 + footprint_for_c174_OmitFeatures_of_0-> 0 + footprint_for_c180_SQLITE_OMIT_ALTERTABLE_of_minus7-> -7 + footprint_for_c187_SQLITE_OMIT_ANALYZE_of_minus5-> -5 + footprint_for_c194_SQLITE_OMIT_ATTACH_of_minus8-> -8 + footprint_for_c201_SQLITE_OMIT_AUTHORIZATION_of_minus5-> -5 + footprint_for_c208_SQLITE_OMIT_AUTOINCREMENT_of_minus3-> -3 + footprint_for_c215_SQLITE_OMIT_AUTOMATIC_INDEX_of_minus4-> -4 + footprint_for_c222_SQLITE_OMIT_AUTOINIT_of_0-> 0 + footprint_for_c228_SQLITE_OMIT_AUTOVACUUM_of_minus14-> -14 + footprint_for_c235_SQLITE_OMIT_BETWEEN_OPTIMIZATION_of_0-> 0 + footprint_for_c241_SQLITE_OMIT_BLOB_LITERAL_of_minus1-> -1 + footprint_for_c248_SQLITE_OMIT_BTREECOUNT_of_minus2-> -2 + footprint_for_c255_SQLITE_OMIT_BUILTIN_TEST_of_minus2-> -2 + footprint_for_c262_SQLITE_OMIT_CAST_of_minus1-> -1 + footprint_for_c269_SQLITE_OMIT_CHECK_of_minus1-> -1 + footprint_for_c276_SQLITE_OMIT_COMPILEOPTION_DIAGS_of_minus1-> -1 + footprint_for_c283_SQLITE_OMIT_COMPLETE_of_minus888-> -888 + footprint_for_c290_SQLITE_OMIT_COMPOUND_SELECT_of_minus10-> -10 + footprint_for_c297_SQLITE_OMIT_CONFLICT_CLAUSE_of_0-> 0 + footprint_for_c303_SQLITE_OMIT_DATETIME_FUNCS_of_minus10-> -10 + footprint_for_c310_SQLITE_OMIT_DECLTYPE_of_minus1-> -1 + footprint_for_c319_SQLITE_OMIT_DEPRECATED_of_minus1-> -1 + footprint_for_c326_SQLITE_OMIT_EXPLAIN_of_minus10-> -10 + footprint_for_c333_SQLITE_OMIT_FLAG_PRAGMAS_of_minus1-> -1 + footprint_for_c340_SQLITE_OMIT_FLOATING_POINT_of_minus18-> -18 + footprint_for_c347_SQLITE_OMIT_FOREIGN_KEY_of_minus15-> -15 + footprint_for_c354_SQLITE_OMIT_GET_TABLE_of_minus3-> -3 + footprint_for_c361_SQLITE_OMIT_INCRBLOB_of_minus7-> -7 + footprint_for_c368_SQLITE_OMIT_INTEGRITY_CHECK_of_minus9-> -9 + footprint_for_c375_SQLITE_OMIT_LIKE_OPTIMIZATION_of_minus2-> -2 + footprint_for_c382_SQLITE_OMIT_LOAD_EXTENSION_of_minus3-> -3 + footprint_for_c389_SQLITE_OMIT_LOCALTIME_of_minus1-> -1 + footprint_for_c396_SQLITE_OMIT_LOOKASIDE_of_minus1-> -1 + footprint_for_c403_SQLITE_OMIT_MEMORYDB_of_minus2-> -2 + footprint_for_c410_SQLITE_OMIT_OR_OPTIMIZATION_of_minus5-> -5 + footprint_for_c417_SQLITE_OMIT_PAGER_PRAGMAS_of_minus5-> -5 + footprint_for_c424_SQLITE_OMIT_PRAGMA_of_minus16-> -16 + footprint_for_c431_SQLITE_OMIT_PROGRESS_CALLBACK_of_minus1-> -1 + footprint_for_c438_SQLITE_OMIT_QUICKBALANCE_of_minus1-> -1 + footprint_for_c445_SQLITE_OMIT_REINDEX_of_minus1-> -1 + footprint_for_c452_SQLITE_OMIT_SCHEMA_PRAGMAS_of_minus2-> -2 + footprint_for_c459_SQLITE_OMIT_SCHEMA_VERSION_PRAGMAS_of_minus1-> -1 + footprint_for_c466_SQLITE_OMIT_SHARED_CACHE_of_minus10-> -10 + footprint_for_c473_SQLITE_OMIT_SUBQUERY_of_minus11-> -11 + footprint_for_c480_SQLITE_OMIT_TCL_VARIABLE_of_0-> 0 + footprint_for_c486_SQLITE_OMIT_TEMPDB_of_0-> 0 + footprint_for_c492_SQLITE_OMIT_TRACE_of_minus3-> -3 + footprint_for_c499_SQLITE_OMIT_TRIGGER_of_minus27-> -27 + footprint_for_c506_SQLITE_OMIT_TRUNCATE_OPTIMIZATION_of_0-> 0 + footprint_for_c512_SQLITE_OMIT_UTF16_of_minus8-> -8 + footprint_for_c519_SQLITE_OMIT_VACUUM_of_minus4-> -4 + footprint_for_c526_SQLITE_OMIT_VIEW_of_minus3-> -3 + footprint_for_c533_SQLITE_OMIT_VIRTUALTABLE_of_minus20-> -20 + footprint_for_c540_SQLITE_OMIT_WAL_of_minus30-> -30 + footprint_for_c547_SQLITE_OMIT_XFER_OPT_of_minus3-> -3 + footprint_for_c554_SQLITE_DEBUG_of_9-> 9 + footprint_for_c560_SQLITE_MEMDEBUG_of_2-> 2
}
run show for partial_speedup optimize o_global
