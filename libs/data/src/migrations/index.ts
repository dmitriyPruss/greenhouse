import { InputMigrations } from 'umzug';
import { MigrationContext } from '../utility-types';
import { CreateUsersTable20220609163245 } from './20220609163245.CreateUsersTable';
import { AlterTableUsersAddColLastName20220609221201 } from './20220609221201.AlterTableUsers.AddColLastName';
import { CreateRefreshTokensTable20220612004910 } from './20220612004910.CreateRefreshTokensTable';
import { CreateControllersTable20220619233000 } from './20220619233000.CreateControllersTable';
import { CreateIndexesTable20220623112699 } from './20220623112699.CreateIndexesTable';
import { CreateTolerancesTable20220623113703 } from './20220623113703.CreateTolerancesTable';
import { CreateTypesTable20220622000001 } from './20220622000001.CreateTypesTable';
import { CreateAccessesTable20220704162015 } from './20220704162015.CreateAccessesTable';
import { CreateAndInsertRolesTable20220704160000 } from './20220704160000.CreateAndInsertRolesTable';
import { CreateAndInsertLabelsTable20220704180243 } from './20220704180243.CreateAndInsertLabelsTable';
import { CreateAndInsertColorsTable20220704180301 } from './20220704180301.CreateAndInsertColorsTable';
import { CreateAndInsertDangerRatesTable20220704180318 } from './20220704180318.CreateAndInsertDangerRatesTable';
import { AlterTableControllersAddColumnActive20220706175910 } from './20220706175910.AlterTableControllers.AddColumnActive';
import { AlterTableTypesAddColumnName20220708163217 } from './20220708163217.AlterTableTypes.AddColumnName';
import { InsertTypesInTypesTable20220709155113 } from './20220709155113.InsertTypesInTypesTable';
import { AlterTableControllersAddColumnAccessCode20220710003205 } from './20220710003205.AlterTableControllersAddColumnAccessCode';
import { AlterTableIndexesRemoveColumnValues20220710122012 } from './20220710122012.AlterTableIndexes.RemoveColumnValues';
import { CreateValuesTable20220710123107 } from './20220710123107.CreateValuesTable';
import { AlterTableRefreshTokensRemoveColumnUser_id20220714000451 } from './20220714000451.AlterTableRefreshTokensRemoveColumnUser_id';
import { AlterTableControllersRenameAccessCodeColumnToHardwareCode20220719221410 } from './20220719221410.AlterTableControllersRenameAccessCodeColumnToHardwareCode';
import { AlterTableIndexesAddColumnsValues20220720123045 } from './20220720123045.AlterTableIndexesAddColumnsValues';
import { CreateKeysTable20220724132047 } from './20220724132047.CreateKeysTable';
import { AlterTableAccessesAddColumnKeyIdRemoveColumnRoleId20220724133436 } from './20220724133436.AlterTableAccessesAddColumnKeyIdRemoveColumnRoleId';
import { AlterAccessesTableRemoveColumnKeyId20220724224949 } from './20220724224949.AlterAccessesTableRemoveColumnKeyId';
import { AlterKeysTableAddColumnAccessId20220724230421 } from './20220724230421.AlterKeysTableAddColumnAccessId';
import { AlterTableKeysAddAndDeleteColumns20220725121258 } from './20220725121258.AlterTableKeysAddAndDeleteColumns';
import { AlterTableKeysAddColumnControllerId20220725133353 } from './20220725133353.AlterTableKeysAddColumnControllerId';
import { AlterTableKeysRemoveColumnIsActive20220725135239 } from './20220725135239.AlterTableKeysRemoveColumnIsActive';
import { AlterTableAccessesAddColumnRoleId20220725140043 } from './20220725140043.AlterTableAccessesAddColumnRoleId';
import { AlterKeysTableRemoveAndAddColumns20220802124957 } from './20220802124957.AlterKeysTableRemoveAndAddColumns';
import { CreateValuesIndices20220811141112 } from './20220811141112.CreateValuesIndices';
// --imports_section_end
const migrationsList: InputMigrations<MigrationContext> = [
	new CreateUsersTable20220609163245(),
	new AlterTableUsersAddColLastName20220609221201(),
	new CreateRefreshTokensTable20220612004910(),
	new CreateAndInsertLabelsTable20220704180243(),
	new CreateAndInsertColorsTable20220704180301(),
	new CreateAndInsertDangerRatesTable20220704180318(),
	new CreateControllersTable20220619233000(),
	new CreateTypesTable20220622000001(),
	new CreateIndexesTable20220623112699(),
	new CreateTolerancesTable20220623113703(),
	new CreateAndInsertRolesTable20220704160000(),
	new CreateAccessesTable20220704162015(),
	new AlterTableControllersAddColumnActive20220706175910(),
	new AlterTableTypesAddColumnName20220708163217(),
	new InsertTypesInTypesTable20220709155113(),
	new AlterTableControllersAddColumnAccessCode20220710003205(),
	new AlterTableIndexesRemoveColumnValues20220710122012(),
	new CreateValuesTable20220710123107(),
	new AlterTableRefreshTokensRemoveColumnUser_id20220714000451(),
	new AlterTableControllersRenameAccessCodeColumnToHardwareCode20220719221410(),
	new AlterTableIndexesAddColumnsValues20220720123045(),
	new CreateKeysTable20220724132047(),
	new AlterTableAccessesAddColumnKeyIdRemoveColumnRoleId20220724133436(),
	new AlterAccessesTableRemoveColumnKeyId20220724224949(),
	new AlterKeysTableAddColumnAccessId20220724230421(),
	new AlterTableKeysAddAndDeleteColumns20220725121258(),
	new AlterTableKeysAddColumnControllerId20220725133353(),
	new AlterTableKeysRemoveColumnIsActive20220725135239(),
	new AlterTableAccessesAddColumnRoleId20220725140043(),
	new AlterKeysTableRemoveAndAddColumns20220802124957(),
	new CreateValuesIndices20220811141112(),
	// --migrations_list_end
];

export default migrationsList;
