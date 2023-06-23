import {createStore, createCustomPersister} from 'tinybase';
import React, {PropsWithChildren, useCallback, useEffect} from 'react';
import {useCreateStore, Provider} from 'tinybase/lib/ui-react';
import {screens} from '../constants';
import * as RNFS from 'react-native-fs';
import {AppState, Text} from 'react-native';

const StoreProvider = ({children}: PropsWithChildren) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const store = useCreateStore(() =>
    createStore().setTablesSchema({
      components: {
        is_favourite: {type: 'boolean', default: false},
        name: {type: 'string', default: ''},
      },
    }),
  );

  async function persistJsonAsync(json: string) {
    const DB_FILE_NAME = RNFS.DocumentDirectoryPath + '/db.json';
    console.log('persisting json', json);
    try {
      await RNFS.writeFile(DB_FILE_NAME, json, 'utf8');
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async function loadPersistedDataAsync() {
    const DB_FILE_NAME = RNFS.DocumentDirectoryPath + '/db.json';
    console.log('loading persisted data');
    try {
      const json = await RNFS.readFile(DB_FILE_NAME, 'utf8');
      console.log('json', json);
      return json;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  const persister = createCustomPersister(
    store,
    async () => loadPersistedDataAsync(),
    async json => await persistJsonAsync(json),
    didChange => {},
    () => {},
  );

  const checkStoreAndUploadData = useCallback(async () => {
    console.log('tables', store.getTables());
    const components = store.getTable('components');
    //if the table is empty, upload data
    if (Object.keys(components).length === 0) {
      console.log('No components found, uploading data');
      for (let screen of screens) {
        const component = {
          name: screen.name,
          is_favourite: false,
        };
        console.log('Adding component', component);
        store.addRow('components', component);
      }
      persister.save();
    } else {
      console.log('Get tables', components);
    }
  }, [store]);

  async function init() {
    try {
      await persister.load();
    } catch (e) {
      console.log(`Failed to load persisted data:`);
      console.log(e);
    } finally {
      store.setValue('initialized', true);
    }
    console.log('Loaded persisted data');
  }
  async function deletePersistedDataAsync() {
    const DB_FILE_NAME = RNFS.DocumentDirectoryPath + '/db.json';
    console.log('deleting persisted data');
    try {
      await RNFS.unlink(DB_FILE_NAME);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  useEffect(() => {
    /*   deletePersistedDataAsync(); */
    /*     store.delTable('components');  */
    init().finally(() => {
      checkStoreAndUploadData();
    });
    const listenerID = store.addValueListener('initialized', () => {
      setIsLoaded(true);
    });

    return () => {
      store.delListener(listenerID);
    };
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      if (state !== 'active') {
        console.log('Saving data');
        persister.save();
      }
    });
    return () => {
      sub.remove();
    };
  }, [persister]);

  return (
    <Provider store={store}>
      {!isLoaded && <Text>Loading</Text>}
      {isLoaded && children}
    </Provider>
  );
};

export default StoreProvider;
