(function (designSystem, adminjs, React, reactRedux, reactRouter) {
	'use strict';

	function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

	var React__default = /*#__PURE__*/_interopDefault(React);

	const RelationConfigProvider = ({
	  children: a,
	  ...b
	}) => {
	  const [c, d] = React.useState(0),
	    e = React.useCallback(() => {
	      d(new Date().getTime());
	    }, []);
	  return /*#__PURE__*/React__default.default.createElement(OwnerRecordContext.Provider, {
	    value: {
	      ...b,
	      refreshToken: c,
	      refresh: e
	    }
	  }, a);
	};
	const OwnerRecordContext = /*#__PURE__*/React.createContext(null);
	const useRelationConfig = () => {
	  const a = React.useContext(OwnerRecordContext);
	  if (!a) throw new Error("useRelationConfig used outside of RelationConfigProvider");
	  return a;
	};

	const api$2 = new adminjs.ApiClient();
	const useRelationRecords = a => {
	  const {
	      record: b,
	      resource: c,
	      targetResourceId: d,
	      tab: e
	    } = a,
	    {
	      relation: f,
	      refreshToken: g
	    } = useRelationConfig(),
	    [h, i] = React.useState(),
	    [j, k] = React.useState(true),
	    {
	      direction: l,
	      sortBy: m,
	      page: n,
	      parsedQuery: o
	    } = adminjs.useQueryParams(),
	    p = adminjs.useNotice();
	  return React.useEffect(() => {
	    e === f && b && (k(true), api$2.recordAction({
	      actionName: "findRelation",
	      recordId: b.id,
	      resourceId: c.id,
	      params: {
	        relation: f,
	        direction: l,
	        sortBy: m,
	        page: n
	      }
	    }).then(({
	      data: {
	        records: a,
	        meta: b,
	        notice: c
	      }
	    }) => {
	      c && p(c), k(false), i({
	        records: a,
	        meta: b
	      });
	    }).finally(() => {
	      k(false);
	    }));
	  }, [e, f, b, c.id, d, l, m, n, o, g]), {
	    data: h,
	    isLoading: j
	  };
	};

	let RelationType = /*#__PURE__*/function (a) {
	  return a.OneToMany = "one-to-many", a.ManyToMany = "many-to-many", a;
	}({});

	let Messages = /*#__PURE__*/function (a) {
	  return a.MissingConfiguration = "[@adminjs/relations]_missingConfiguration", a.MissingRecordId = "[@adminjs/relations]_missingRecordId", a.InvalidRelationType = "[@adminjs/relations]_invalidRelationType", a.JoinKeyMissing = "[@adminjs/relations]_joinKeyMissing", a.NoRelationRecordsTitle = "[@adminjs/relations]_noRelationRecordsTitle", a.NoRelationRecords = "[@adminjs/relations]_noRelationRecords", a.JunctionMissing = "[@adminjs/relations]_junctionMissing", a.JunctionResourceIdMissing = "[@adminjs/relations]_junctionResourceIdMissing", a.JunctionResourceMissing = "[@adminjs/relations]_junctionResourceMissing", a.ChooseItemSubtitle = "[@adminjs/relations]_chooseItemSubtitle", a.ManyToManyRelationAlreadyExists = "[@adminjs/relations]_mnRelationAlreadyExists", a.RelationSuccessfullyAdded = "[@adminjs/relations]_relationSuccessfullyAdded", a.RelationSuccessfullyDeleted = "[@adminjs/relations]_relationSuccessfullyDeleted", a.QueryParamsMissing = "[@adminjs/relations]_queryParamsMissing", a.JunctionRecordMissing = "[@adminjs/relations]_junctionRecordMissing", a;
	}({});
	let Labels = /*#__PURE__*/function (a) {
	  return a.ChooseItemHeader = "[@adminjs/relations]_chooseItemHeader", a.DeleteRelationHeader = "[@adminjs/relations]_deleteRelationHeader", a;
	}({});
	let Actions = /*#__PURE__*/function (a) {
	  return a.AddItem = "[@adminjs/relations]_addItem", a.RemoveRelation = "[@adminjs/relations]_removeRelation", a.RemoveRecord = "[@adminjs/relations]_removeRecord", a;
	}({});

	const RelationNoRecords$1 = a => {
	  const {
	      resource: {
	        name: b,
	        id: c,
	        resourceActions: d
	      }
	    } = a,
	    {
	      ownerRecord: e,
	      relations: f,
	      relation: g
	    } = useRelationConfig(),
	    {
	      tb: h,
	      tm: i
	    } = adminjs.useTranslation(),
	    j = f[g].target.resourceId,
	    k = f[g].junction?.joinKey,
	    l = f[g].junction?.inverseJoinKey;
	  if (!j || !k || !l) return null;
	  const m = d.find(({
	    name: a
	  }) => "new" === a);
	  return /*#__PURE__*/React__default.default.createElement(designSystem.InfoBox, {
	    title: i(Messages.NoRelationRecordsTitle, c),
	    illustration: "Docs"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	    mb: "xxl"
	  }, i(Messages.NoRelationRecords, c, {
	    relationName: b
	  })), m && /*#__PURE__*/React__default.default.createElement(adminjs.ActionButton, {
	    action: m,
	    resourceId: c,
	    queryParams: {
	      [k]: e.id,
	      junctionResourceId: f[g].junction?.throughResourceId,
	      joinKey: k,
	      inverseJoinKey: l,
	      redirectUrl: location.href
	    }
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    variant: "contained"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
	    icon: "Plus"
	  }), h("createFirstRecord", c))));
	};

	const useRedirectUrl = () => {
	  const a = new URL(location.href); // Remove current redirectUrl to prevent infinite redirections
	  return a.searchParams.get("redirectUrl") && a.searchParams.delete("redirectUrl"), a.href;
	};

	const api$1 = new adminjs.ApiClient();
	const RelationRecordInListActions$1 = a => {
	  const {
	      record: {
	        recordActions: b,
	        id: c
	      },
	      resource: {
	        id: d
	      }
	    } = a,
	    [e, f] = React.useState(false),
	    {
	      ownerRecord: g,
	      ownerResource: h,
	      relation: i,
	      relations: j,
	      refresh: k
	    } = useRelationConfig(),
	    {
	      deleteOptions: {
	        enableDeleteRelation: l,
	        enableDeleteRelatedRecord: m
	      } = {
	        enableDeleteRelatedRecord: true,
	        enableDeleteRelation: true
	      }
	    } = j[i],
	    n = adminjs.useNotice(),
	    {
	      ta: o,
	      tl: p
	    } = adminjs.useTranslation(),
	    q = useRedirectUrl(),
	    r = (a = false) => {
	      a && k(), f(false);
	    },
	    s = async () => {
	      const a = await api$1.recordAction({
	          resourceId: h.id,
	          actionName: "deleteRelation",
	          recordId: g.id,
	          params: {
	            targetRecordId: c,
	            relation: i
	          }
	        }),
	        {
	          data: b
	        } = a;
	      return b;
	    },
	    t = async () => {
	      const a = await api$1.recordAction({
	          resourceId: d,
	          actionName: "delete",
	          recordId: c
	        }),
	        {
	          data: b
	        } = a;
	      return b;
	    },
	    u = [],
	    v = {
	      variant: "outlined",
	      label: o(Actions.RemoveRelation, d),
	      onClick: async () => {
	        const a = await s();
	        r(true), z(a);
	      }
	    },
	    w = {
	      variant: "outlined",
	      label: o(Actions.RemoveRecord, d),
	      color: "danger",
	      onClick: async () => {
	        let a = await s();
	        const {
	          notice: b
	        } = a;
	        r(true), b && "success" === b.type && (a = await t(), z(a));
	      }
	    },
	    x = g.recordActions.find(a => "deleteRelation" === a.name);
	  l && x && u.push(v);
	  const y = b.find(a => "delete" === a.name);
	  m && y && u.push(w);
	  const z = a => {
	      const {
	        notice: b
	      } = a;
	      b && n(b);
	    },
	    A = {
	      title: p(Labels.DeleteRelationHeader),
	      onOverlayClick: r,
	      onClose: r,
	      buttons: u
	    },
	    B = {
	      show: "Eye",
	      edit: "Edit2",
	      delete: "Trash2"
	    },
	    C = b.filter(a => "delete" !== a.name);
	  return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    flex: true
	  }, C.map(a => /*#__PURE__*/React__default.default.createElement(adminjs.ActionButton, {
	    key: a.name,
	    action: a,
	    resourceId: d,
	    recordId: c,
	    queryParams: {
	      redirectUrl: q
	    }
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    size: "icon",
	    rounded: true,
	    color: a.variant
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
	    icon: B[a.name]
	  })))), u.length && /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, e && /*#__PURE__*/React__default.default.createElement(designSystem.Modal, A), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    size: "icon",
	    rounded: true,
	    color: "danger",
	    onClick: () => f(true)
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
	    icon: B["delete"]
	  }))));
	};

	const RelationRecordInList$1 = a => {
	  const {
	    resource: b,
	    record: c,
	    isLoading: d
	  } = a;
	  return /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
	    "data-id": c.id,
	    "data-css": [b.id, "row"].join("-")
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, {
	    width: 0
	  }), b.listProperties.map(a => /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, {
	    style: {
	      cursor: "pointer",
	      whiteSpace: "nowrap"
	    },
	    key: a.propertyPath,
	    "data-property-name": a.propertyPath,
	    display: "table-cell",
	    "data-css": [b.id, a.name, "cell"].join("-")
	  }, d ? /*#__PURE__*/React__default.default.createElement(designSystem.Placeholder, {
	    style: {
	      height: 14
	    }
	  }) : /*#__PURE__*/React__default.default.createElement(adminjs.BasePropertyComponent, {
	    key: a.propertyPath,
	    where: "list",
	    property: a,
	    resource: b,
	    record: c
	  }))), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, {
	    key: "options",
	    className: "options"
	  }, d ? /*#__PURE__*/React__default.default.createElement(designSystem.Placeholder, {
	    style: {
	      height: 14
	    }
	  }) : /*#__PURE__*/React__default.default.createElement(RelationRecordInListActions$1, {
	    record: c,
	    resource: b
	  })));
	};

	const RelationRecordsTable$1 = a => {
	  const {
	      targetResource: b,
	      records: c,
	      isLoading: d
	    } = a,
	    {
	      ownerResource: e
	    } = useRelationConfig(),
	    {
	      direction: f,
	      sortBy: g
	    } = adminjs.useQueryParams();
	  if (!c.length && !d) return /*#__PURE__*/React__default.default.createElement(RelationNoRecords$1, {
	    resource: b
	  });
	  const h = {
	    ...b,
	    listProperties: b.listProperties.filter(({
	      reference: a
	    }) => a !== e.id)
	  };
	  return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    overflow: "auto"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Table, {
	    "data-css": "relations-table"
	  }, /*#__PURE__*/React__default.default.createElement(adminjs.RecordsTableHeader, {
	    properties: h.listProperties,
	    titleProperty: h.titleProperty,
	    direction: f,
	    sortBy: g
	  }), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, {
	    "data-css": "relations-table-body"
	  }, c.map(a => /*#__PURE__*/React__default.default.createElement(RelationRecordInList$1, {
	    key: a.id,
	    record: a,
	    resource: h,
	    isLoading: d
	  })))));
	};

	const api = new adminjs.ApiClient();
	const AddItemModal = ({
	  targetResource: a,
	  ownerResource: b,
	  ownerRecord: c,
	  relation: d,
	  onCloseModal: e
	}) => {
	  const [f, g] = React.useState(null),
	    [h, i] = React.useState(),
	    [j, k] = React.useState(),
	    [l, m] = React.useState(0),
	    {
	      tb: n,
	      tm: o
	    } = adminjs.useTranslation();
	  React.useEffect(() => {
	    if (f) {
	      m(a => a + 1);
	      const b = new adminjs.ApiClient();
	      b.recordAction({
	        actionName: "show",
	        resourceId: a.id,
	        recordId: f + ""
	      }).then(({
	        data: a
	      }) => {
	        i(a.record);
	      }).finally(() => {
	        m(a => a - 1);
	      });
	    }
	  }, [f, a]);
	  const p = h,
	    q = f && p ? {
	      value: p.id,
	      label: p.title
	    } : {
	      value: "",
	      label: ""
	    };
	  return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    flex: true,
	    flexDirection: "column",
	    width: "100%",
	    mt: "md"
	  }, j && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
	    message: o(j.message, j.resourceId, j.options),
	    variant: "error" === j.type ? "danger" : j.type ?? "info",
	    my: "md"
	  }), /*#__PURE__*/React__default.default.createElement(designSystem.SelectAsync, {
	    cacheOptions: true,
	    value: q,
	    defaultOptions: true,
	    loadOptions: async b => {
	      const c = await api.searchRecords({
	          resourceId: a.id,
	          query: b
	        }),
	        d = c.map(a => ({
	          value: a.id,
	          label: a.title,
	          record: a
	        }));
	      return d;
	    },
	    onChange: a => {
	      a ? g(a.value) : g(null);
	    },
	    isClearable: true,
	    isLoading: !!l
	  }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    flex: true,
	    justifyContent: "center",
	    mt: "xxl"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    variant: "light",
	    color: "primary",
	    onClick: () => e(false),
	    mr: "md"
	  }, n("cancel")), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    variant: "contained",
	    color: "primary",
	    onClick: async () => {
	      k(void 0);
	      const a = await api.recordAction({
	          recordId: c.id,
	          resourceId: b.id,
	          actionName: "addManyToManyRelation",
	          data: {
	            targetId: f
	          },
	          params: {
	            relation: d
	          }
	        }),
	        {
	          data: g
	        } = a,
	        {
	          notice: h
	        } = g ?? {};
	      h && ("success" === h.type ? e(true) : k(h));
	    },
	    disabled: !f
	  }, n("submit"))));
	};

	const RelationResourceActions$1 = a => {
	  const {
	      targetResource: b,
	      ownerResource: c,
	      junctionResource: d
	    } = a,
	    {
	      ownerRecord: e,
	      relations: f,
	      relation: g,
	      refresh: h
	    } = useRelationConfig(),
	    [i, j] = React.useState(false),
	    {
	      ta: k,
	      tl: l,
	      tm: m
	    } = adminjs.useTranslation(),
	    n = useRedirectUrl(),
	    o = f[g].target.resourceId,
	    p = f[g].junction?.joinKey,
	    q = f[g].junction?.inverseJoinKey,
	    r = (a = false) => {
	      a && h(), j(false);
	    };
	  if (!p || !q) return null;
	  const s = {
	      title: l(Labels.ChooseItemHeader, b.id),
	      subTitle: m(Messages.ChooseItemSubtitle, b.id),
	      onOverlayClick: r,
	      onClose: r
	    },
	    t = d.resourceActions.find(({
	      name: a
	    }) => "new" === a),
	    u = b.resourceActions.filter(({
	      name: a
	    }) => "new" === a);
	  return t ? /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    flex: true,
	    justifyContent: "end"
	  }, t && /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, i && /*#__PURE__*/React__default.default.createElement(designSystem.Modal, s, /*#__PURE__*/React__default.default.createElement(AddItemModal, {
	    targetResource: b,
	    ownerResource: c,
	    ownerRecord: e,
	    relation: g,
	    onCloseModal: r
	  })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    flex: true,
	    mb: "xl",
	    mr: "xl",
	    justifyContent: "end"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    variant: "outline",
	    onClick: () => {
	      j(true);
	    }
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
	    icon: "PlusCircle"
	  }), k(Actions.AddItem, b.id)))), u.map(a => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    key: a.name,
	    flex: true,
	    mb: "xl",
	    justifyContent: "end"
	  }, /*#__PURE__*/React__default.default.createElement(adminjs.ActionButton, {
	    action: a,
	    resourceId: o,
	    queryParams: {
	      [p]: e.id,
	      junctionResourceId: f[g].junction?.throughResourceId,
	      joinKey: p,
	      inverseJoinKey: q,
	      redirectUrl: n
	    }
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    variant: "contained"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
	    icon: a.icon
	  }), k(a.name, b.id)))))) : null;
	};

	const RelationNoRecords = a => {
	  const {
	      resource: {
	        name: b,
	        id: c,
	        resourceActions: d
	      }
	    } = a,
	    {
	      ownerRecord: e,
	      relations: f,
	      relation: g
	    } = useRelationConfig(),
	    {
	      tb: h,
	      tm: i
	    } = adminjs.useTranslation(),
	    j = f[g].target.joinKey,
	    k = d.find(({
	      name: a
	    }) => "new" === a);
	  return j ? /*#__PURE__*/React__default.default.createElement(designSystem.InfoBox, {
	    title: i(Messages.NoRelationRecordsTitle, c),
	    illustration: "Docs"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	    mb: "xxl"
	  }, i(Messages.NoRelationRecords, c, {
	    relationName: b
	  })), k && /*#__PURE__*/React__default.default.createElement(adminjs.ActionButton, {
	    action: k,
	    resourceId: c,
	    queryParams: {
	      [j]: e.id,
	      redirectUrl: location.href
	    }
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    variant: "contained"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
	    icon: "Plus"
	  }), h("createFirstRecord", c)))) : null;
	};

	const RelationRecordInListActions = a => {
	  const {
	      record: {
	        recordActions: b,
	        id: c
	      },
	      resource: {
	        id: d
	      }
	    } = a,
	    {
	      refresh: e
	    } = useRelationConfig(),
	    f = reactRouter.useNavigate(),
	    g = useRedirectUrl(),
	    {
	      pathname: h,
	      search: i
	    } = reactRouter.useLocation(),
	    j = {
	      show: "Eye",
	      edit: "Edit2",
	      delete: "Trash2"
	    },
	    k = ({
	      notice: a
	    }) => {
	      a && "success" === a.type && (f({
	        pathname: h,
	        search: i
	      }), e());
	    };
	  return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    flex: true,
	    justifyContent: "end"
	  }, b.map(a => /*#__PURE__*/React__default.default.createElement(adminjs.ActionButton, {
	    key: a.name,
	    action: a,
	    resourceId: d,
	    recordId: c,
	    actionPerformed: k,
	    queryParams: {
	      redirectUrl: g
	    }
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    size: "icon",
	    rounded: true,
	    color: a.variant
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
	    icon: j[a.name]
	  })))));
	};

	const v = new adminjs.ViewHelpers();
	const RelationRecordInList = a => {
	  const {
	      resource: b,
	      record: c,
	      isLoading: d
	    } = a,
	    e = reactRouter.useNavigate(),
	    f = useRedirectUrl(),
	    g = c.recordActions.find(({
	      name: a
	    }) => "show" === a);
	  return /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
	    "data-id": c.id,
	    "data-css": [b.id, "row"].join("-"),
	    onClick: () => {
	      if (g) {
	        const a = v.recordActionUrl({
	          actionName: g.name,
	          recordId: c.id,
	          resourceId: b.id,
	          search: `?redirectUrl=${encodeURIComponent(f)}`
	        });
	        e(a);
	      }
	    }
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, {
	    width: 0
	  }), b.listProperties.map(a => /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, {
	    style: {
	      cursor: g ? "pointer" : "initial",
	      whiteSpace: "nowrap"
	    },
	    key: a.propertyPath,
	    "data-property-name": a.propertyPath,
	    display: "table-cell",
	    "data-css": [b.id, a.name, "cell"].join("-")
	  }, d ? /*#__PURE__*/React__default.default.createElement(designSystem.Placeholder, {
	    style: {
	      height: 14
	    }
	  }) : /*#__PURE__*/React__default.default.createElement(adminjs.BasePropertyComponent, {
	    key: a.propertyPath,
	    where: "list",
	    property: a,
	    resource: b,
	    record: c
	  }))), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, {
	    key: "options",
	    className: "options"
	  }, d ? /*#__PURE__*/React__default.default.createElement(designSystem.Placeholder, {
	    style: {
	      height: 14
	    }
	  }) : /*#__PURE__*/React__default.default.createElement(RelationRecordInListActions, {
	    record: c,
	    resource: b
	  })));
	};

	const RelationRecordsTable = a => {
	  const {
	      targetResource: b,
	      records: c,
	      isLoading: d
	    } = a,
	    {
	      ownerResource: e
	    } = useRelationConfig(),
	    {
	      direction: f,
	      sortBy: g
	    } = adminjs.useQueryParams();
	  if (!c.length && !d) return /*#__PURE__*/React__default.default.createElement(RelationNoRecords, {
	    resource: b
	  });
	  const h = {
	    ...b,
	    listProperties: b.listProperties.filter(({
	      reference: a
	    }) => a !== e.id)
	  };
	  return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    overflow: "auto"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Table, {
	    "data-css": "relations-table"
	  }, /*#__PURE__*/React__default.default.createElement(adminjs.RecordsTableHeader, {
	    properties: h.listProperties,
	    titleProperty: h.titleProperty,
	    direction: f,
	    sortBy: g
	  }), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, {
	    "data-css": "relations-table-body"
	  }, c.map(a => /*#__PURE__*/React__default.default.createElement(RelationRecordInList, {
	    key: a.id,
	    record: a,
	    resource: h,
	    isLoading: d
	  })))));
	};

	const RelationResourceActions = a => {
	  const {
	      targetResource: b
	    } = a,
	    {
	      ownerRecord: c,
	      relations: d,
	      relation: e
	    } = useRelationConfig(),
	    {
	      ta: f
	    } = adminjs.useTranslation(),
	    g = useRedirectUrl(),
	    h = d[e].target.resourceId,
	    i = d[e].target.joinKey;
	  if (!i) return null;
	  const j = b.resourceActions.filter(({
	    name: a
	  }) => "new" === a);
	  return j.length ? /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    flex: true,
	    mb: "xl",
	    justifyContent: "end"
	  }, j.map(a => /*#__PURE__*/React__default.default.createElement(adminjs.ActionButton, {
	    key: a.name,
	    action: a,
	    resourceId: h,
	    queryParams: {
	      [i]: c.id,
	      redirectUrl: g
	    }
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    variant: "contained"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
	    icon: a.icon
	  }), f(a.name, b.id))))) : null;
	};

	const RelationTab = () => {
	  const {
	      relation: a,
	      ownerRecord: b,
	      ownerResource: c,
	      relations: d
	    } = useRelationConfig(),
	    e = reactRedux.useSelector(a => a.resources),
	    {
	      storeParams: f
	    } = adminjs.useQueryParams(),
	    {
	      currentTab: g
	    } = designSystem.useTabs(),
	    h = d[a].target.resourceId,
	    i = d[a].junction?.throughResourceId,
	    j = d[a].type,
	    {
	      data: k,
	      isLoading: l
	    } = useRelationRecords({
	      record: b,
	      resource: c,
	      targetResourceId: h,
	      tab: g
	    }),
	    m = a => f({
	      page: a.toString()
	    });
	  if (g !== a) return null;
	  if (!k) return /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null);
	  if (j === RelationType.OneToMany) {
	    const a = e.find(a => a.id === h);
	    if (!a) return null;
	    const {
	      records: b,
	      meta: {
	        total: c,
	        page: d,
	        perPage: f
	      }
	    } = k;
	    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	      py: "xl"
	    }, /*#__PURE__*/React__default.default.createElement(RelationResourceActions, {
	      targetResource: a
	    }), /*#__PURE__*/React__default.default.createElement(RelationRecordsTable, {
	      targetResource: a,
	      records: b,
	      isLoading: l
	    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	      flex: true,
	      justifyContent: "center",
	      mt: "xl"
	    }, /*#__PURE__*/React__default.default.createElement(designSystem.Pagination, {
	      total: c,
	      perPage: f,
	      page: +d,
	      onChange: m
	    })));
	  }
	  if (j === RelationType.ManyToMany) {
	    if (!i) return null;
	    const a = e.find(a => a.id === h),
	      b = e.find(a => a.id === i);
	    if (!a || !b) return null;
	    const {
	      records: d,
	      meta: {
	        total: f,
	        page: g,
	        perPage: j
	      }
	    } = k;
	    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	      py: "xl"
	    }, /*#__PURE__*/React__default.default.createElement(RelationResourceActions$1, {
	      targetResource: a,
	      ownerResource: c,
	      junctionResource: b
	    }), /*#__PURE__*/React__default.default.createElement(RelationRecordsTable$1, {
	      targetResource: a,
	      records: d,
	      isLoading: l
	    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	      flex: true,
	      justifyContent: "center",
	      mt: "xl"
	    }, /*#__PURE__*/React__default.default.createElement(designSystem.Pagination, {
	      total: f,
	      perPage: j,
	      page: +g,
	      onChange: m
	    })));
	  }
	  return null;
	};

	const RelationsShowPropertyComponent = a => {
	  const {
	      resource: b,
	      record: c,
	      property: d
	    } = a,
	    {
	      id: e,
	      properties: f
	    } = b,
	    {
	      relations: g
	    } = f[d.path].props,
	    h = Object.keys(g),
	    {
	      tab: j = h[0],
	      storeParams: i
	    } = adminjs.useQueryParams(),
	    {
	      tl: k
	    } = adminjs.useTranslation(),
	    l = React.useCallback(a => {
	      i({
	        tab: a,
	        sortBy: void 0,
	        direction: void 0,
	        redirectUrl: void 0
	      });
	    }, []);
	  return c && h.length ? /*#__PURE__*/React__default.default.createElement(designSystem.Tabs, {
	    currentTab: j,
	    onChange: l
	  }, h.map(a => /*#__PURE__*/React__default.default.createElement(designSystem.Tab, {
	    key: a,
	    id: a,
	    label: k(a, e)
	  }, /*#__PURE__*/React__default.default.createElement(RelationConfigProvider, {
	    relation: a,
	    relations: g,
	    ownerResource: b,
	    ownerRecord: c
	  }, /*#__PURE__*/React__default.default.createElement(RelationTab, null))))) : null;
	};
	var RelationsShowPropertyComponent$1 = /*#__PURE__*/React.memo(RelationsShowPropertyComponent);

	const RelationsEditPropertyComponent = () => /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null);
	var RelationsEditPropertyComponent$1 = /*#__PURE__*/React.memo(RelationsEditPropertyComponent);

	const RelationsListPropertyComponent = a => {
	  const {
	      resource: {
	        properties: c
	      },
	      property: b
	    } = a,
	    {
	      relationsTargets: d
	    } = c[b.path].props,
	    e = Object.values(d),
	    {
	      tl: f
	    } = adminjs.useTranslation();
	  return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, e.map(({
	    resourceId: a
	  }) => /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
	    key: a,
	    mr: "sm"
	  }, f(a, a))));
	};
	var RelationsListPropertyComponent$1 = /*#__PURE__*/React.memo(RelationsListPropertyComponent);

	AdminJS.UserComponents = {};
	AdminJS.UserComponents.RelationsShowPropertyComponent = RelationsShowPropertyComponent$1;
	AdminJS.UserComponents.RelationsEditPropertyComponent = RelationsEditPropertyComponent$1;
	AdminJS.UserComponents.RelationsListPropertyComponent = RelationsListPropertyComponent$1;

})(AdminJSDesignSystem, AdminJS, React, ReactRedux, ReactRouter);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrcmVsYXRpb25zQDEuMS4yX2FkbWluanNANy44LjE1X0B0eXBlcytiYWJlbF9fY29yZUA3LjIwLjVfQHR5cGVzK3JlYWN0LWRvbUAxOS4wLjRfQHR5X3lsdzdpM3l5Z21vdWliZTVxeWxtZGpyNmU0L25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL3Byb3ZpZGVycy9SZWxhdGlvbkNvbmZpZ1Byb3ZpZGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3JlbGF0aW9uc0AxLjEuMl9hZG1pbmpzQDcuOC4xNV9AdHlwZXMrYmFiZWxfX2NvcmVANy4yMC41X0B0eXBlcytyZWFjdC1kb21AMTkuMC40X0B0eV95bHc3aTN5eWdtb3VpYmU1cXlsbWRqcjZlNC9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9ob29rcy91c2VSZWxhdGlvblJlY29yZHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrcmVsYXRpb25zQDEuMS4yX2FkbWluanNANy44LjE1X0B0eXBlcytiYWJlbF9fY29yZUA3LjIwLjVfQHR5cGVzK3JlYWN0LWRvbUAxOS4wLjRfQHR5X3lsdzdpM3l5Z21vdWliZTVxeWxtZGpyNmU0L25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL3R5cGVzL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3JlbGF0aW9uc0AxLjEuMl9hZG1pbmpzQDcuOC4xNV9AdHlwZXMrYmFiZWxfX2NvcmVANy4yMC41X0B0eXBlcytyZWFjdC1kb21AMTkuMC40X0B0eV95bHc3aTN5eWdtb3VpYmU1cXlsbWRqcjZlNC9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb25zdGFudHMvbWVzc2FnZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrcmVsYXRpb25zQDEuMS4yX2FkbWluanNANy44LjE1X0B0eXBlcytiYWJlbF9fY29yZUA3LjIwLjVfQHR5cGVzK3JlYWN0LWRvbUAxOS4wLjRfQHR5X3lsdzdpM3l5Z21vdWliZTVxeWxtZGpyNmU0L25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2NvbXBvbmVudHMvbWFueS10by1tYW55L1JlbGF0aW9uTm9SZWNvcmRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3JlbGF0aW9uc0AxLjEuMl9hZG1pbmpzQDcuOC4xNV9AdHlwZXMrYmFiZWxfX2NvcmVANy4yMC41X0B0eXBlcytyZWFjdC1kb21AMTkuMC40X0B0eV95bHc3aTN5eWdtb3VpYmU1cXlsbWRqcjZlNC9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL3NoYXJlZC91c2VSZWRpcmVjdFVybC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytyZWxhdGlvbnNAMS4xLjJfYWRtaW5qc0A3LjguMTVfQHR5cGVzK2JhYmVsX19jb3JlQDcuMjAuNV9AdHlwZXMrcmVhY3QtZG9tQDE5LjAuNF9AdHlfeWx3N2kzeXlnbW91aWJlNXF5bG1kanI2ZTQvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9tYW55LXRvLW1hbnkvUmVsYXRpb25SZWNvcmRJbkxpc3RBY3Rpb25zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3JlbGF0aW9uc0AxLjEuMl9hZG1pbmpzQDcuOC4xNV9AdHlwZXMrYmFiZWxfX2NvcmVANy4yMC41X0B0eXBlcytyZWFjdC1kb21AMTkuMC40X0B0eV95bHc3aTN5eWdtb3VpYmU1cXlsbWRqcjZlNC9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL21hbnktdG8tbWFueS9SZWxhdGlvblJlY29yZEluTGlzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytyZWxhdGlvbnNAMS4xLjJfYWRtaW5qc0A3LjguMTVfQHR5cGVzK2JhYmVsX19jb3JlQDcuMjAuNV9AdHlwZXMrcmVhY3QtZG9tQDE5LjAuNF9AdHlfeWx3N2kzeXlnbW91aWJlNXF5bG1kanI2ZTQvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9tYW55LXRvLW1hbnkvUmVsYXRpb25SZWNvcmRzVGFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrcmVsYXRpb25zQDEuMS4yX2FkbWluanNANy44LjE1X0B0eXBlcytiYWJlbF9fY29yZUA3LjIwLjVfQHR5cGVzK3JlYWN0LWRvbUAxOS4wLjRfQHR5X3lsdzdpM3l5Z21vdWliZTVxeWxtZGpyNmU0L25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2NvbXBvbmVudHMvbWFueS10by1tYW55L0FkZEl0ZW1Nb2RhbENvbnRlbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrcmVsYXRpb25zQDEuMS4yX2FkbWluanNANy44LjE1X0B0eXBlcytiYWJlbF9fY29yZUA3LjIwLjVfQHR5cGVzK3JlYWN0LWRvbUAxOS4wLjRfQHR5X3lsdzdpM3l5Z21vdWliZTVxeWxtZGpyNmU0L25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2NvbXBvbmVudHMvbWFueS10by1tYW55L1JlbGF0aW9uUmVzb3VyY2VBY3Rpb25zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3JlbGF0aW9uc0AxLjEuMl9hZG1pbmpzQDcuOC4xNV9AdHlwZXMrYmFiZWxfX2NvcmVANy4yMC41X0B0eXBlcytyZWFjdC1kb21AMTkuMC40X0B0eV95bHc3aTN5eWdtb3VpYmU1cXlsbWRqcjZlNC9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL29uZS10by1tYW55L1JlbGF0aW9uTm9SZWNvcmRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3JlbGF0aW9uc0AxLjEuMl9hZG1pbmpzQDcuOC4xNV9AdHlwZXMrYmFiZWxfX2NvcmVANy4yMC41X0B0eXBlcytyZWFjdC1kb21AMTkuMC40X0B0eV95bHc3aTN5eWdtb3VpYmU1cXlsbWRqcjZlNC9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL29uZS10by1tYW55L1JlbGF0aW9uUmVjb3JkSW5MaXN0QWN0aW9ucy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytyZWxhdGlvbnNAMS4xLjJfYWRtaW5qc0A3LjguMTVfQHR5cGVzK2JhYmVsX19jb3JlQDcuMjAuNV9AdHlwZXMrcmVhY3QtZG9tQDE5LjAuNF9AdHlfeWx3N2kzeXlnbW91aWJlNXF5bG1kanI2ZTQvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9vbmUtdG8tbWFueS9SZWxhdGlvblJlY29yZEluTGlzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytyZWxhdGlvbnNAMS4xLjJfYWRtaW5qc0A3LjguMTVfQHR5cGVzK2JhYmVsX19jb3JlQDcuMjAuNV9AdHlwZXMrcmVhY3QtZG9tQDE5LjAuNF9AdHlfeWx3N2kzeXlnbW91aWJlNXF5bG1kanI2ZTQvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9vbmUtdG8tbWFueS9SZWxhdGlvblJlY29yZHNUYWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytyZWxhdGlvbnNAMS4xLjJfYWRtaW5qc0A3LjguMTVfQHR5cGVzK2JhYmVsX19jb3JlQDcuMjAuNV9AdHlwZXMrcmVhY3QtZG9tQDE5LjAuNF9AdHlfeWx3N2kzeXlnbW91aWJlNXF5bG1kanI2ZTQvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9vbmUtdG8tbWFueS9SZWxhdGlvblJlc291cmNlQWN0aW9ucy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytyZWxhdGlvbnNAMS4xLjJfYWRtaW5qc0A3LjguMTVfQHR5cGVzK2JhYmVsX19jb3JlQDcuMjAuNV9AdHlwZXMrcmVhY3QtZG9tQDE5LjAuNF9AdHlfeWx3N2kzeXlnbW91aWJlNXF5bG1kanI2ZTQvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9zaGFyZWQvUmVsYXRpb25UYWIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrcmVsYXRpb25zQDEuMS4yX2FkbWluanNANy44LjE1X0B0eXBlcytiYWJlbF9fY29yZUA3LjIwLjVfQHR5cGVzK3JlYWN0LWRvbUAxOS4wLjRfQHR5X3lsdzdpM3l5Z21vdWliZTVxeWxtZGpyNmU0L25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2NvbXBvbmVudHMvUmVsYXRpb25zU2hvd1Byb3BlcnR5Q29tcG9uZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3JlbGF0aW9uc0AxLjEuMl9hZG1pbmpzQDcuOC4xNV9AdHlwZXMrYmFiZWxfX2NvcmVANy4yMC41X0B0eXBlcytyZWFjdC1kb21AMTkuMC40X0B0eV95bHc3aTN5eWdtb3VpYmU1cXlsbWRqcjZlNC9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL1JlbGF0aW9uc0VkaXRQcm9wZXJ0eUNvbXBvbmVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytyZWxhdGlvbnNAMS4xLjJfYWRtaW5qc0A3LjguMTVfQHR5cGVzK2JhYmVsX19jb3JlQDcuMjAuNV9AdHlwZXMrcmVhY3QtZG9tQDE5LjAuNF9AdHlfeWx3N2kzeXlnbW91aWJlNXF5bG1kanI2ZTQvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9SZWxhdGlvbnNMaXN0UHJvcGVydHlDb21wb25lbnQuanMiLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse2NyZWF0ZUNvbnRleHQsdXNlQ29udGV4dH1mcm9tXCJyZWFjdFwiO2ltcG9ydHt1c2VTdGF0ZX1mcm9tXCJyZWFjdFwiO2ltcG9ydHt1c2VDYWxsYmFja31mcm9tXCJyZWFjdFwiO2V4cG9ydCBjb25zdCBSZWxhdGlvbkNvbmZpZ1Byb3ZpZGVyPSh7Y2hpbGRyZW46YSwuLi5ifSk9Pntjb25zdFtjLGRdPXVzZVN0YXRlKDApLGU9dXNlQ2FsbGJhY2soKCk9PntkKG5ldyBEYXRlKCkuZ2V0VGltZSgpKX0sW10pO3JldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KE93bmVyUmVjb3JkQ29udGV4dC5Qcm92aWRlcix7dmFsdWU6ey4uLmIscmVmcmVzaFRva2VuOmMscmVmcmVzaDplfX0sYSl9O2NvbnN0IE93bmVyUmVjb3JkQ29udGV4dD0vKiNfX1BVUkVfXyovY3JlYXRlQ29udGV4dChudWxsKTtleHBvcnQgY29uc3QgdXNlUmVsYXRpb25Db25maWc9KCk9Pntjb25zdCBhPXVzZUNvbnRleHQoT3duZXJSZWNvcmRDb250ZXh0KTtpZighYSl0aHJvdyBuZXcgRXJyb3IoXCJ1c2VSZWxhdGlvbkNvbmZpZyB1c2VkIG91dHNpZGUgb2YgUmVsYXRpb25Db25maWdQcm92aWRlclwiKTtyZXR1cm4gYX07IiwiaW1wb3J0e0FwaUNsaWVudCx1c2VOb3RpY2UsdXNlUXVlcnlQYXJhbXN9ZnJvbVwiYWRtaW5qc1wiO2ltcG9ydHt1c2VFZmZlY3QsdXNlU3RhdGV9ZnJvbVwicmVhY3RcIjtpbXBvcnR7dXNlUmVsYXRpb25Db25maWd9ZnJvbVwiLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtjb25zdCBhcGk9bmV3IEFwaUNsaWVudDtleHBvcnQgY29uc3QgdXNlUmVsYXRpb25SZWNvcmRzPWE9Pntjb25zdHtyZWNvcmQ6YixyZXNvdXJjZTpjLHRhcmdldFJlc291cmNlSWQ6ZCx0YWI6ZX09YSx7cmVsYXRpb246ZixyZWZyZXNoVG9rZW46Z309dXNlUmVsYXRpb25Db25maWcoKSxbaCxpXT11c2VTdGF0ZSgpLFtqLGtdPXVzZVN0YXRlKCEwKSx7ZGlyZWN0aW9uOmwsc29ydEJ5Om0scGFnZTpuLHBhcnNlZFF1ZXJ5Om99PXVzZVF1ZXJ5UGFyYW1zKCkscD11c2VOb3RpY2UoKTtyZXR1cm4gdXNlRWZmZWN0KCgpPT57ZT09PWYmJmImJihrKCEwKSxhcGkucmVjb3JkQWN0aW9uKHthY3Rpb25OYW1lOlwiZmluZFJlbGF0aW9uXCIscmVjb3JkSWQ6Yi5pZCxyZXNvdXJjZUlkOmMuaWQscGFyYW1zOntyZWxhdGlvbjpmLGRpcmVjdGlvbjpsLHNvcnRCeTptLHBhZ2U6bn19KS50aGVuKCh7ZGF0YTp7cmVjb3JkczphLG1ldGE6Yixub3RpY2U6Y319KT0+e2MmJnAoYyksayghMSksaSh7cmVjb3JkczphLG1ldGE6Yn0pfSkuZmluYWxseSgoKT0+e2soITEpfSkpfSxbZSxmLGIsYy5pZCxkLGwsbSxuLG8sZ10pLHtkYXRhOmgsaXNMb2FkaW5nOmp9fTsiLCJleHBvcnQgbGV0IFJlbGF0aW9uVHlwZT0vKiNfX1BVUkVfXyovZnVuY3Rpb24oYSl7cmV0dXJuIGEuT25lVG9NYW55PVwib25lLXRvLW1hbnlcIixhLk1hbnlUb01hbnk9XCJtYW55LXRvLW1hbnlcIixhfSh7fSk7IiwiZXhwb3J0IGxldCBNZXNzYWdlcz0vKiNfX1BVUkVfXyovZnVuY3Rpb24oYSl7cmV0dXJuIGEuTWlzc2luZ0NvbmZpZ3VyYXRpb249XCJbQGFkbWluanMvcmVsYXRpb25zXV9taXNzaW5nQ29uZmlndXJhdGlvblwiLGEuTWlzc2luZ1JlY29yZElkPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fbWlzc2luZ1JlY29yZElkXCIsYS5JbnZhbGlkUmVsYXRpb25UeXBlPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11faW52YWxpZFJlbGF0aW9uVHlwZVwiLGEuSm9pbktleU1pc3Npbmc9XCJbQGFkbWluanMvcmVsYXRpb25zXV9qb2luS2V5TWlzc2luZ1wiLGEuTm9SZWxhdGlvblJlY29yZHNUaXRsZT1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX25vUmVsYXRpb25SZWNvcmRzVGl0bGVcIixhLk5vUmVsYXRpb25SZWNvcmRzPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fbm9SZWxhdGlvblJlY29yZHNcIixhLkp1bmN0aW9uTWlzc2luZz1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX2p1bmN0aW9uTWlzc2luZ1wiLGEuSnVuY3Rpb25SZXNvdXJjZUlkTWlzc2luZz1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX2p1bmN0aW9uUmVzb3VyY2VJZE1pc3NpbmdcIixhLkp1bmN0aW9uUmVzb3VyY2VNaXNzaW5nPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fanVuY3Rpb25SZXNvdXJjZU1pc3NpbmdcIixhLkNob29zZUl0ZW1TdWJ0aXRsZT1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX2Nob29zZUl0ZW1TdWJ0aXRsZVwiLGEuTWFueVRvTWFueVJlbGF0aW9uQWxyZWFkeUV4aXN0cz1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX21uUmVsYXRpb25BbHJlYWR5RXhpc3RzXCIsYS5SZWxhdGlvblN1Y2Nlc3NmdWxseUFkZGVkPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fcmVsYXRpb25TdWNjZXNzZnVsbHlBZGRlZFwiLGEuUmVsYXRpb25TdWNjZXNzZnVsbHlEZWxldGVkPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fcmVsYXRpb25TdWNjZXNzZnVsbHlEZWxldGVkXCIsYS5RdWVyeVBhcmFtc01pc3Npbmc9XCJbQGFkbWluanMvcmVsYXRpb25zXV9xdWVyeVBhcmFtc01pc3NpbmdcIixhLkp1bmN0aW9uUmVjb3JkTWlzc2luZz1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX2p1bmN0aW9uUmVjb3JkTWlzc2luZ1wiLGF9KHt9KTtleHBvcnQgbGV0IExhYmVscz0vKiNfX1BVUkVfXyovZnVuY3Rpb24oYSl7cmV0dXJuIGEuQ2hvb3NlSXRlbUhlYWRlcj1cIltAYWRtaW5qcy9yZWxhdGlvbnNdX2Nob29zZUl0ZW1IZWFkZXJcIixhLkRlbGV0ZVJlbGF0aW9uSGVhZGVyPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fZGVsZXRlUmVsYXRpb25IZWFkZXJcIixhfSh7fSk7ZXhwb3J0IGxldCBBY3Rpb25zPS8qI19fUFVSRV9fKi9mdW5jdGlvbihhKXtyZXR1cm4gYS5BZGRJdGVtPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fYWRkSXRlbVwiLGEuUmVtb3ZlUmVsYXRpb249XCJbQGFkbWluanMvcmVsYXRpb25zXV9yZW1vdmVSZWxhdGlvblwiLGEuUmVtb3ZlUmVjb3JkPVwiW0BhZG1pbmpzL3JlbGF0aW9uc11fcmVtb3ZlUmVjb3JkXCIsYX0oe30pOyIsImltcG9ydHtJbmZvQm94LFRleHQsQnV0dG9uLEljb259ZnJvbVwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO2ltcG9ydHtBY3Rpb25CdXR0b24sdXNlVHJhbnNsYXRpb259ZnJvbVwiYWRtaW5qc1wiO2ltcG9ydCBSZWFjdCBmcm9tXCJyZWFjdFwiO2ltcG9ydHtNZXNzYWdlc31mcm9tXCIuLi8uLi9jb25zdGFudHMvbWVzc2FnZXMuanNcIjtpbXBvcnR7dXNlUmVsYXRpb25Db25maWd9ZnJvbVwiLi4vLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtleHBvcnQgY29uc3QgUmVsYXRpb25Ob1JlY29yZHM9YT0+e2NvbnN0e3Jlc291cmNlOntuYW1lOmIsaWQ6YyxyZXNvdXJjZUFjdGlvbnM6ZH19PWEse293bmVyUmVjb3JkOmUscmVsYXRpb25zOmYscmVsYXRpb246Z309dXNlUmVsYXRpb25Db25maWcoKSx7dGI6aCx0bTppfT11c2VUcmFuc2xhdGlvbigpLGo9ZltnXS50YXJnZXQucmVzb3VyY2VJZCxrPWZbZ10uanVuY3Rpb24/LmpvaW5LZXksbD1mW2ddLmp1bmN0aW9uPy5pbnZlcnNlSm9pbktleTtpZighanx8IWt8fCFsKXJldHVybiBudWxsO2NvbnN0IG09ZC5maW5kKCh7bmFtZTphfSk9PlwibmV3XCI9PT1hKTtyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChJbmZvQm94LHt0aXRsZTppKE1lc3NhZ2VzLk5vUmVsYXRpb25SZWNvcmRzVGl0bGUsYyksaWxsdXN0cmF0aW9uOlwiRG9jc1wifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LHttYjpcInh4bFwifSxpKE1lc3NhZ2VzLk5vUmVsYXRpb25SZWNvcmRzLGMse3JlbGF0aW9uTmFtZTpifSkpLG0mJi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEFjdGlvbkJ1dHRvbix7YWN0aW9uOm0scmVzb3VyY2VJZDpjLHF1ZXJ5UGFyYW1zOntba106ZS5pZCxqdW5jdGlvblJlc291cmNlSWQ6ZltnXS5qdW5jdGlvbj8udGhyb3VnaFJlc291cmNlSWQsam9pbktleTprLGludmVyc2VKb2luS2V5OmwscmVkaXJlY3RVcmw6bG9jYXRpb24uaHJlZn19LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbix7dmFyaWFudDpcImNvbnRhaW5lZFwifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChJY29uLHtpY29uOlwiUGx1c1wifSksaChcImNyZWF0ZUZpcnN0UmVjb3JkXCIsYykpKSl9OyIsImV4cG9ydCBjb25zdCB1c2VSZWRpcmVjdFVybD0oKT0+e2NvbnN0IGE9bmV3IFVSTChsb2NhdGlvbi5ocmVmKTsvLyBSZW1vdmUgY3VycmVudCByZWRpcmVjdFVybCB0byBwcmV2ZW50IGluZmluaXRlIHJlZGlyZWN0aW9uc1xucmV0dXJuIGEuc2VhcmNoUGFyYW1zLmdldChcInJlZGlyZWN0VXJsXCIpJiZhLnNlYXJjaFBhcmFtcy5kZWxldGUoXCJyZWRpcmVjdFVybFwiKSxhLmhyZWZ9OyIsImltcG9ydHtCb3gsQnV0dG9uLEljb24sTW9kYWx9ZnJvbVwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO2ltcG9ydHtBY3Rpb25CdXR0b24sQXBpQ2xpZW50LHVzZU5vdGljZSx1c2VUcmFuc2xhdGlvbn1mcm9tXCJhZG1pbmpzXCI7aW1wb3J0IFJlYWN0LHt1c2VTdGF0ZX1mcm9tXCJyZWFjdFwiO2ltcG9ydHtBY3Rpb25zLExhYmVsc31mcm9tXCIuLi8uLi9jb25zdGFudHMvbWVzc2FnZXMuanNcIjtpbXBvcnR7dXNlUmVsYXRpb25Db25maWd9ZnJvbVwiLi4vLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtpbXBvcnR7dXNlUmVkaXJlY3RVcmx9ZnJvbVwiLi4vc2hhcmVkL3VzZVJlZGlyZWN0VXJsLmpzXCI7Y29uc3QgYXBpPW5ldyBBcGlDbGllbnQ7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uUmVjb3JkSW5MaXN0QWN0aW9ucz1hPT57Y29uc3R7cmVjb3JkOntyZWNvcmRBY3Rpb25zOmIsaWQ6Y30scmVzb3VyY2U6e2lkOmR9fT1hLFtlLGZdPXVzZVN0YXRlKCExKSx7b3duZXJSZWNvcmQ6Zyxvd25lclJlc291cmNlOmgscmVsYXRpb246aSxyZWxhdGlvbnM6aixyZWZyZXNoOmt9PXVzZVJlbGF0aW9uQ29uZmlnKCkse2RlbGV0ZU9wdGlvbnM6e2VuYWJsZURlbGV0ZVJlbGF0aW9uOmwsZW5hYmxlRGVsZXRlUmVsYXRlZFJlY29yZDptfT17ZW5hYmxlRGVsZXRlUmVsYXRlZFJlY29yZDohMCxlbmFibGVEZWxldGVSZWxhdGlvbjohMH19PWpbaV0sbj11c2VOb3RpY2UoKSx7dGE6byx0bDpwfT11c2VUcmFuc2xhdGlvbigpLHE9dXNlUmVkaXJlY3RVcmwoKSxyPShhPSExKT0+e2EmJmsoKSxmKCExKX0scz1hc3luYygpPT57Y29uc3QgYT1hd2FpdCBhcGkucmVjb3JkQWN0aW9uKHtyZXNvdXJjZUlkOmguaWQsYWN0aW9uTmFtZTpcImRlbGV0ZVJlbGF0aW9uXCIscmVjb3JkSWQ6Zy5pZCxwYXJhbXM6e3RhcmdldFJlY29yZElkOmMscmVsYXRpb246aX19KSx7ZGF0YTpifT1hO3JldHVybiBifSx0PWFzeW5jKCk9Pntjb25zdCBhPWF3YWl0IGFwaS5yZWNvcmRBY3Rpb24oe3Jlc291cmNlSWQ6ZCxhY3Rpb25OYW1lOlwiZGVsZXRlXCIscmVjb3JkSWQ6Y30pLHtkYXRhOmJ9PWE7cmV0dXJuIGJ9LHU9W10sdj17dmFyaWFudDpcIm91dGxpbmVkXCIsbGFiZWw6byhBY3Rpb25zLlJlbW92ZVJlbGF0aW9uLGQpLG9uQ2xpY2s6YXN5bmMoKT0+e2NvbnN0IGE9YXdhaXQgcygpO3IoITApLHooYSl9fSx3PXt2YXJpYW50Olwib3V0bGluZWRcIixsYWJlbDpvKEFjdGlvbnMuUmVtb3ZlUmVjb3JkLGQpLGNvbG9yOlwiZGFuZ2VyXCIsb25DbGljazphc3luYygpPT57bGV0IGE9YXdhaXQgcygpO2NvbnN0e25vdGljZTpifT1hO3IoITApLGImJlwic3VjY2Vzc1wiPT09Yi50eXBlJiYoYT1hd2FpdCB0KCkseihhKSl9fSx4PWcucmVjb3JkQWN0aW9ucy5maW5kKGE9PlwiZGVsZXRlUmVsYXRpb25cIj09PWEubmFtZSk7bCYmeCYmdS5wdXNoKHYpO2NvbnN0IHk9Yi5maW5kKGE9PlwiZGVsZXRlXCI9PT1hLm5hbWUpO20mJnkmJnUucHVzaCh3KTtjb25zdCB6PWE9Pntjb25zdHtub3RpY2U6Yn09YTtiJiZuKGIpfSxBPXt0aXRsZTpwKExhYmVscy5EZWxldGVSZWxhdGlvbkhlYWRlciksb25PdmVybGF5Q2xpY2s6cixvbkNsb3NlOnIsYnV0dG9uczp1fSxCPXtzaG93OlwiRXllXCIsZWRpdDpcIkVkaXQyXCIsZGVsZXRlOlwiVHJhc2gyXCJ9LEM9Yi5maWx0ZXIoYT0+XCJkZWxldGVcIiE9PWEubmFtZSk7cmV0dXJuLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LHtmbGV4OiEwfSxDLm1hcChhPT4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChBY3Rpb25CdXR0b24se2tleTphLm5hbWUsYWN0aW9uOmEscmVzb3VyY2VJZDpkLHJlY29yZElkOmMscXVlcnlQYXJhbXM6e3JlZGlyZWN0VXJsOnF9fSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24se3NpemU6XCJpY29uXCIscm91bmRlZDohMCxjb2xvcjphLnZhcmlhbnR9LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEljb24se2ljb246QlthLm5hbWVdfSkpKSksdS5sZW5ndGgmJi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LG51bGwsZSYmLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWwsQSksLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLHtzaXplOlwiaWNvblwiLHJvdW5kZWQ6ITAsY29sb3I6XCJkYW5nZXJcIixvbkNsaWNrOigpPT5mKCEwKX0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbix7aWNvbjpCW1wiZGVsZXRlXCJdfSkpKSl9OyIsImltcG9ydHtQbGFjZWhvbGRlcixUYWJsZUNlbGwsVGFibGVSb3d9ZnJvbVwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO2ltcG9ydHtCYXNlUHJvcGVydHlDb21wb25lbnR9ZnJvbVwiYWRtaW5qc1wiO2ltcG9ydCBSZWFjdCBmcm9tXCJyZWFjdFwiO2ltcG9ydHtSZWxhdGlvblJlY29yZEluTGlzdEFjdGlvbnN9ZnJvbVwiLi9SZWxhdGlvblJlY29yZEluTGlzdEFjdGlvbnMuanNcIjtleHBvcnQgY29uc3QgUmVsYXRpb25SZWNvcmRJbkxpc3Q9YT0+e2NvbnN0e3Jlc291cmNlOmIscmVjb3JkOmMsaXNMb2FkaW5nOmR9PWE7cmV0dXJuLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3cse1wiZGF0YS1pZFwiOmMuaWQsXCJkYXRhLWNzc1wiOltiLmlkLFwicm93XCJdLmpvaW4oXCItXCIpfSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwse3dpZHRoOjB9KSxiLmxpc3RQcm9wZXJ0aWVzLm1hcChhPT4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwse3N0eWxlOntjdXJzb3I6XCJwb2ludGVyXCIsd2hpdGVTcGFjZTpcIm5vd3JhcFwifSxrZXk6YS5wcm9wZXJ0eVBhdGgsXCJkYXRhLXByb3BlcnR5LW5hbWVcIjphLnByb3BlcnR5UGF0aCxkaXNwbGF5OlwidGFibGUtY2VsbFwiLFwiZGF0YS1jc3NcIjpbYi5pZCxhLm5hbWUsXCJjZWxsXCJdLmpvaW4oXCItXCIpfSxkPy8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFBsYWNlaG9sZGVyLHtzdHlsZTp7aGVpZ2h0OjE0fX0pOi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJhc2VQcm9wZXJ0eUNvbXBvbmVudCx7a2V5OmEucHJvcGVydHlQYXRoLHdoZXJlOlwibGlzdFwiLHByb3BlcnR5OmEscmVzb3VyY2U6YixyZWNvcmQ6Y30pKSksLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLHtrZXk6XCJvcHRpb25zXCIsY2xhc3NOYW1lOlwib3B0aW9uc1wifSxkPy8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFBsYWNlaG9sZGVyLHtzdHlsZTp7aGVpZ2h0OjE0fX0pOi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlbGF0aW9uUmVjb3JkSW5MaXN0QWN0aW9ucyx7cmVjb3JkOmMscmVzb3VyY2U6Yn0pKSl9OyIsImltcG9ydHtCb3gsVGFibGUsVGFibGVCb2R5fWZyb21cIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtpbXBvcnR7UmVjb3Jkc1RhYmxlSGVhZGVyLHVzZVF1ZXJ5UGFyYW1zfWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3QgZnJvbVwicmVhY3RcIjtpbXBvcnR7dXNlUmVsYXRpb25Db25maWd9ZnJvbVwiLi4vLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtpbXBvcnR7UmVsYXRpb25Ob1JlY29yZHN9ZnJvbVwiLi9SZWxhdGlvbk5vUmVjb3Jkcy5qc1wiO2ltcG9ydHtSZWxhdGlvblJlY29yZEluTGlzdH1mcm9tXCIuL1JlbGF0aW9uUmVjb3JkSW5MaXN0LmpzXCI7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uUmVjb3Jkc1RhYmxlPWE9Pntjb25zdHt0YXJnZXRSZXNvdXJjZTpiLHJlY29yZHM6Yyxpc0xvYWRpbmc6ZH09YSx7b3duZXJSZXNvdXJjZTplfT11c2VSZWxhdGlvbkNvbmZpZygpLHtkaXJlY3Rpb246Zixzb3J0Qnk6Z309dXNlUXVlcnlQYXJhbXMoKTtpZighYy5sZW5ndGgmJiFkKXJldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlbGF0aW9uTm9SZWNvcmRzLHtyZXNvdXJjZTpifSk7Y29uc3QgaD17Li4uYixsaXN0UHJvcGVydGllczpiLmxpc3RQcm9wZXJ0aWVzLmZpbHRlcigoe3JlZmVyZW5jZTphfSk9PmEhPT1lLmlkKX07cmV0dXJuLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LHtvdmVyZmxvdzpcImF1dG9cIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUse1wiZGF0YS1jc3NcIjpcInJlbGF0aW9ucy10YWJsZVwifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWNvcmRzVGFibGVIZWFkZXIse3Byb3BlcnRpZXM6aC5saXN0UHJvcGVydGllcyx0aXRsZVByb3BlcnR5OmgudGl0bGVQcm9wZXJ0eSxkaXJlY3Rpb246Zixzb3J0Qnk6Z30pLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSx7XCJkYXRhLWNzc1wiOlwicmVsYXRpb25zLXRhYmxlLWJvZHlcIn0sYy5tYXAoYT0+LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVsYXRpb25SZWNvcmRJbkxpc3Qse2tleTphLmlkLHJlY29yZDphLHJlc291cmNlOmgsaXNMb2FkaW5nOmR9KSkpKSl9OyIsImltcG9ydHtCb3gsQnV0dG9uLE1lc3NhZ2VCb3gsU2VsZWN0QXN5bmN9ZnJvbVwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO2ltcG9ydHtBcGlDbGllbnQsdXNlVHJhbnNsYXRpb259ZnJvbVwiYWRtaW5qc1wiO2ltcG9ydCBSZWFjdCx7dXNlRWZmZWN0LHVzZVN0YXRlfWZyb21cInJlYWN0XCI7Y29uc3QgYXBpPW5ldyBBcGlDbGllbnQ7ZXhwb3J0IGNvbnN0IEFkZEl0ZW1Nb2RhbD0oe3RhcmdldFJlc291cmNlOmEsb3duZXJSZXNvdXJjZTpiLG93bmVyUmVjb3JkOmMscmVsYXRpb246ZCxvbkNsb3NlTW9kYWw6ZX0pPT57Y29uc3RbZixnXT11c2VTdGF0ZShudWxsKSxbaCxpXT11c2VTdGF0ZSgpLFtqLGtdPXVzZVN0YXRlKCksW2wsbV09dXNlU3RhdGUoMCkse3RiOm4sdG06b309dXNlVHJhbnNsYXRpb24oKTt1c2VFZmZlY3QoKCk9PntpZihmKXttKGE9PmErMSk7Y29uc3QgYj1uZXcgQXBpQ2xpZW50O2IucmVjb3JkQWN0aW9uKHthY3Rpb25OYW1lOlwic2hvd1wiLHJlc291cmNlSWQ6YS5pZCxyZWNvcmRJZDpmK1wiXCJ9KS50aGVuKCh7ZGF0YTphfSk9PntpKGEucmVjb3JkKX0pLmZpbmFsbHkoKCk9PnttKGE9PmEtMSl9KX19LFtmLGFdKTtjb25zdCBwPWgscT1mJiZwP3t2YWx1ZTpwLmlkLGxhYmVsOnAudGl0bGV9Ont2YWx1ZTpcIlwiLGxhYmVsOlwiXCJ9O3JldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCx7ZmxleDohMCxmbGV4RGlyZWN0aW9uOlwiY29sdW1uXCIsd2lkdGg6XCIxMDAlXCIsbXQ6XCJtZFwifSxqJiYvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LHttZXNzYWdlOm8oai5tZXNzYWdlLGoucmVzb3VyY2VJZCxqLm9wdGlvbnMpLHZhcmlhbnQ6XCJlcnJvclwiPT09ai50eXBlP1wiZGFuZ2VyXCI6ai50eXBlPz9cImluZm9cIixteTpcIm1kXCJ9KSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3RBc3luYyx7Y2FjaGVPcHRpb25zOiEwLHZhbHVlOnEsZGVmYXVsdE9wdGlvbnM6ITAsbG9hZE9wdGlvbnM6YXN5bmMgYj0+e2NvbnN0IGM9YXdhaXQgYXBpLnNlYXJjaFJlY29yZHMoe3Jlc291cmNlSWQ6YS5pZCxxdWVyeTpifSksZD1jLm1hcChhPT4oe3ZhbHVlOmEuaWQsbGFiZWw6YS50aXRsZSxyZWNvcmQ6YX0pKTtyZXR1cm4gZH0sb25DaGFuZ2U6YT0+e2E/ZyhhLnZhbHVlKTpnKG51bGwpfSxpc0NsZWFyYWJsZTohMCxpc0xvYWRpbmc6ISFsfSksLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LHtmbGV4OiEwLGp1c3RpZnlDb250ZW50OlwiY2VudGVyXCIsbXQ6XCJ4eGxcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLHt2YXJpYW50OlwibGlnaHRcIixjb2xvcjpcInByaW1hcnlcIixvbkNsaWNrOigpPT5lKCExKSxtcjpcIm1kXCJ9LG4oXCJjYW5jZWxcIikpLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbix7dmFyaWFudDpcImNvbnRhaW5lZFwiLGNvbG9yOlwicHJpbWFyeVwiLG9uQ2xpY2s6YXN5bmMoKT0+e2sodm9pZCAwKTtjb25zdCBhPWF3YWl0IGFwaS5yZWNvcmRBY3Rpb24oe3JlY29yZElkOmMuaWQscmVzb3VyY2VJZDpiLmlkLGFjdGlvbk5hbWU6XCJhZGRNYW55VG9NYW55UmVsYXRpb25cIixkYXRhOnt0YXJnZXRJZDpmfSxwYXJhbXM6e3JlbGF0aW9uOmR9fSkse2RhdGE6Z309YSx7bm90aWNlOmh9PWc/P3t9O2gmJihcInN1Y2Nlc3NcIj09PWgudHlwZT9lKCEwKTprKGgpKX0sZGlzYWJsZWQ6IWZ9LG4oXCJzdWJtaXRcIikpKSl9O2V4cG9ydCBkZWZhdWx0IEFkZEl0ZW1Nb2RhbDsiLCJpbXBvcnR7Qm94LEJ1dHRvbixJY29uLE1vZGFsfWZyb21cIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtpbXBvcnR7QWN0aW9uQnV0dG9uLHVzZVRyYW5zbGF0aW9ufWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3Qse3VzZVN0YXRlfWZyb21cInJlYWN0XCI7aW1wb3J0e0FjdGlvbnMsTGFiZWxzLE1lc3NhZ2VzfWZyb21cIi4uLy4uL2NvbnN0YW50cy9tZXNzYWdlcy5qc1wiO2ltcG9ydHt1c2VSZWxhdGlvbkNvbmZpZ31mcm9tXCIuLi8uLi9wcm92aWRlcnMvUmVsYXRpb25Db25maWdQcm92aWRlci5qc1wiO2ltcG9ydCBBZGRJdGVtTW9kYWxDb250ZW50IGZyb21cIi4vQWRkSXRlbU1vZGFsQ29udGVudC5qc1wiO2ltcG9ydHt1c2VSZWRpcmVjdFVybH1mcm9tXCIuLi9zaGFyZWQvdXNlUmVkaXJlY3RVcmwuanNcIjtleHBvcnQgY29uc3QgUmVsYXRpb25SZXNvdXJjZUFjdGlvbnM9YT0+e2NvbnN0e3RhcmdldFJlc291cmNlOmIsb3duZXJSZXNvdXJjZTpjLGp1bmN0aW9uUmVzb3VyY2U6ZH09YSx7b3duZXJSZWNvcmQ6ZSxyZWxhdGlvbnM6ZixyZWxhdGlvbjpnLHJlZnJlc2g6aH09dXNlUmVsYXRpb25Db25maWcoKSxbaSxqXT11c2VTdGF0ZSghMSkse3RhOmssdGw6bCx0bTptfT11c2VUcmFuc2xhdGlvbigpLG49dXNlUmVkaXJlY3RVcmwoKSxvPWZbZ10udGFyZ2V0LnJlc291cmNlSWQscD1mW2ddLmp1bmN0aW9uPy5qb2luS2V5LHE9ZltnXS5qdW5jdGlvbj8uaW52ZXJzZUpvaW5LZXkscj0oYT0hMSk9PnthJiZoKCksaighMSl9O2lmKCFwfHwhcSlyZXR1cm4gbnVsbDtjb25zdCBzPXt0aXRsZTpsKExhYmVscy5DaG9vc2VJdGVtSGVhZGVyLGIuaWQpLHN1YlRpdGxlOm0oTWVzc2FnZXMuQ2hvb3NlSXRlbVN1YnRpdGxlLGIuaWQpLG9uT3ZlcmxheUNsaWNrOnIsb25DbG9zZTpyfSx0PWQucmVzb3VyY2VBY3Rpb25zLmZpbmQoKHtuYW1lOmF9KT0+XCJuZXdcIj09PWEpLHU9Yi5yZXNvdXJjZUFjdGlvbnMuZmlsdGVyKCh7bmFtZTphfSk9PlwibmV3XCI9PT1hKTtyZXR1cm4gdD8vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gse2ZsZXg6ITAsanVzdGlmeUNvbnRlbnQ6XCJlbmRcIn0sdCYmLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsbnVsbCxpJiYvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbCxzLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEFkZEl0ZW1Nb2RhbENvbnRlbnQse3RhcmdldFJlc291cmNlOmIsb3duZXJSZXNvdXJjZTpjLG93bmVyUmVjb3JkOmUscmVsYXRpb246ZyxvbkNsb3NlTW9kYWw6cn0pKSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gse2ZsZXg6ITAsbWI6XCJ4bFwiLG1yOlwieGxcIixqdXN0aWZ5Q29udGVudDpcImVuZFwifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24se3ZhcmlhbnQ6XCJvdXRsaW5lXCIsb25DbGljazooKT0+e2ooITApfX0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbix7aWNvbjpcIlBsdXNDaXJjbGVcIn0pLGsoQWN0aW9ucy5BZGRJdGVtLGIuaWQpKSkpLHUubWFwKGE9Pi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCx7a2V5OmEubmFtZSxmbGV4OiEwLG1iOlwieGxcIixqdXN0aWZ5Q29udGVudDpcImVuZFwifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChBY3Rpb25CdXR0b24se2FjdGlvbjphLHJlc291cmNlSWQ6byxxdWVyeVBhcmFtczp7W3BdOmUuaWQsanVuY3Rpb25SZXNvdXJjZUlkOmZbZ10uanVuY3Rpb24/LnRocm91Z2hSZXNvdXJjZUlkLGpvaW5LZXk6cCxpbnZlcnNlSm9pbktleTpxLHJlZGlyZWN0VXJsOm59fSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24se3ZhcmlhbnQ6XCJjb250YWluZWRcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbix7aWNvbjphLmljb259KSxrKGEubmFtZSxiLmlkKSkpKSkpOm51bGx9OyIsImltcG9ydHtJbmZvQm94LFRleHQsQnV0dG9uLEljb259ZnJvbVwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO2ltcG9ydHtBY3Rpb25CdXR0b24sdXNlVHJhbnNsYXRpb259ZnJvbVwiYWRtaW5qc1wiO2ltcG9ydCBSZWFjdCBmcm9tXCJyZWFjdFwiO2ltcG9ydHtNZXNzYWdlc31mcm9tXCIuLi8uLi9jb25zdGFudHMvbWVzc2FnZXMuanNcIjtpbXBvcnR7dXNlUmVsYXRpb25Db25maWd9ZnJvbVwiLi4vLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtleHBvcnQgY29uc3QgUmVsYXRpb25Ob1JlY29yZHM9YT0+e2NvbnN0e3Jlc291cmNlOntuYW1lOmIsaWQ6YyxyZXNvdXJjZUFjdGlvbnM6ZH19PWEse293bmVyUmVjb3JkOmUscmVsYXRpb25zOmYscmVsYXRpb246Z309dXNlUmVsYXRpb25Db25maWcoKSx7dGI6aCx0bTppfT11c2VUcmFuc2xhdGlvbigpLGo9ZltnXS50YXJnZXQuam9pbktleSxrPWQuZmluZCgoe25hbWU6YX0pPT5cIm5ld1wiPT09YSk7cmV0dXJuIGo/LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoSW5mb0JveCx7dGl0bGU6aShNZXNzYWdlcy5Ob1JlbGF0aW9uUmVjb3Jkc1RpdGxlLGMpLGlsbHVzdHJhdGlvbjpcIkRvY3NcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCx7bWI6XCJ4eGxcIn0saShNZXNzYWdlcy5Ob1JlbGF0aW9uUmVjb3JkcyxjLHtyZWxhdGlvbk5hbWU6Yn0pKSxrJiYvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChBY3Rpb25CdXR0b24se2FjdGlvbjprLHJlc291cmNlSWQ6YyxxdWVyeVBhcmFtczp7W2pdOmUuaWQscmVkaXJlY3RVcmw6bG9jYXRpb24uaHJlZn19LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbix7dmFyaWFudDpcImNvbnRhaW5lZFwifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChJY29uLHtpY29uOlwiUGx1c1wifSksaChcImNyZWF0ZUZpcnN0UmVjb3JkXCIsYykpKSk6bnVsbH07IiwiaW1wb3J0e0JveCxCdXR0b24sSWNvbn1mcm9tXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7aW1wb3J0e0FjdGlvbkJ1dHRvbn1mcm9tXCJhZG1pbmpzXCI7aW1wb3J0IFJlYWN0IGZyb21cInJlYWN0XCI7aW1wb3J0e3VzZUxvY2F0aW9uLHVzZU5hdmlnYXRlfWZyb21cInJlYWN0LXJvdXRlclwiO2ltcG9ydHt1c2VSZWxhdGlvbkNvbmZpZ31mcm9tXCIuLi8uLi9wcm92aWRlcnMvUmVsYXRpb25Db25maWdQcm92aWRlci5qc1wiO2ltcG9ydHt1c2VSZWRpcmVjdFVybH1mcm9tXCIuLi9zaGFyZWQvdXNlUmVkaXJlY3RVcmwuanNcIjtleHBvcnQgY29uc3QgUmVsYXRpb25SZWNvcmRJbkxpc3RBY3Rpb25zPWE9Pntjb25zdHtyZWNvcmQ6e3JlY29yZEFjdGlvbnM6YixpZDpjfSxyZXNvdXJjZTp7aWQ6ZH19PWEse3JlZnJlc2g6ZX09dXNlUmVsYXRpb25Db25maWcoKSxmPXVzZU5hdmlnYXRlKCksZz11c2VSZWRpcmVjdFVybCgpLHtwYXRobmFtZTpoLHNlYXJjaDppfT11c2VMb2NhdGlvbigpLGo9e3Nob3c6XCJFeWVcIixlZGl0OlwiRWRpdDJcIixkZWxldGU6XCJUcmFzaDJcIn0saz0oe25vdGljZTphfSk9PnthJiZcInN1Y2Nlc3NcIj09PWEudHlwZSYmKGYoe3BhdGhuYW1lOmgsc2VhcmNoOml9KSxlKCkpfTtyZXR1cm4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gse2ZsZXg6ITAsanVzdGlmeUNvbnRlbnQ6XCJlbmRcIn0sYi5tYXAoYT0+LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQWN0aW9uQnV0dG9uLHtrZXk6YS5uYW1lLGFjdGlvbjphLHJlc291cmNlSWQ6ZCxyZWNvcmRJZDpjLGFjdGlvblBlcmZvcm1lZDprLHF1ZXJ5UGFyYW1zOntyZWRpcmVjdFVybDpnfX0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLHtzaXplOlwiaWNvblwiLHJvdW5kZWQ6ITAsY29sb3I6YS52YXJpYW50fSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChJY29uLHtpY29uOmpbYS5uYW1lXX0pKSkpKX07IiwiaW1wb3J0e1BsYWNlaG9sZGVyLFRhYmxlQ2VsbCxUYWJsZVJvd31mcm9tXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7aW1wb3J0e0Jhc2VQcm9wZXJ0eUNvbXBvbmVudCxWaWV3SGVscGVyc31mcm9tXCJhZG1pbmpzXCI7aW1wb3J0IFJlYWN0IGZyb21cInJlYWN0XCI7aW1wb3J0e3VzZU5hdmlnYXRlfWZyb21cInJlYWN0LXJvdXRlclwiO2ltcG9ydHtSZWxhdGlvblJlY29yZEluTGlzdEFjdGlvbnN9ZnJvbVwiLi9SZWxhdGlvblJlY29yZEluTGlzdEFjdGlvbnMuanNcIjtpbXBvcnR7dXNlUmVkaXJlY3RVcmx9ZnJvbVwiLi4vc2hhcmVkL3VzZVJlZGlyZWN0VXJsLmpzXCI7Y29uc3Qgdj1uZXcgVmlld0hlbHBlcnM7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uUmVjb3JkSW5MaXN0PWE9Pntjb25zdHtyZXNvdXJjZTpiLHJlY29yZDpjLGlzTG9hZGluZzpkfT1hLGU9dXNlTmF2aWdhdGUoKSxmPXVzZVJlZGlyZWN0VXJsKCksZz1jLnJlY29yZEFjdGlvbnMuZmluZCgoe25hbWU6YX0pPT5cInNob3dcIj09PWEpO3JldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LHtcImRhdGEtaWRcIjpjLmlkLFwiZGF0YS1jc3NcIjpbYi5pZCxcInJvd1wiXS5qb2luKFwiLVwiKSxvbkNsaWNrOigpPT57aWYoZyl7Y29uc3QgYT12LnJlY29yZEFjdGlvblVybCh7YWN0aW9uTmFtZTpnLm5hbWUscmVjb3JkSWQ6Yy5pZCxyZXNvdXJjZUlkOmIuaWQsc2VhcmNoOmA/cmVkaXJlY3RVcmw9JHtlbmNvZGVVUklDb21wb25lbnQoZil9YH0pO2UoYSl9fX0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLHt3aWR0aDowfSksYi5saXN0UHJvcGVydGllcy5tYXAoYT0+LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLHtzdHlsZTp7Y3Vyc29yOmc/XCJwb2ludGVyXCI6XCJpbml0aWFsXCIsd2hpdGVTcGFjZTpcIm5vd3JhcFwifSxrZXk6YS5wcm9wZXJ0eVBhdGgsXCJkYXRhLXByb3BlcnR5LW5hbWVcIjphLnByb3BlcnR5UGF0aCxkaXNwbGF5OlwidGFibGUtY2VsbFwiLFwiZGF0YS1jc3NcIjpbYi5pZCxhLm5hbWUsXCJjZWxsXCJdLmpvaW4oXCItXCIpfSxkPy8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFBsYWNlaG9sZGVyLHtzdHlsZTp7aGVpZ2h0OjE0fX0pOi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJhc2VQcm9wZXJ0eUNvbXBvbmVudCx7a2V5OmEucHJvcGVydHlQYXRoLHdoZXJlOlwibGlzdFwiLHByb3BlcnR5OmEscmVzb3VyY2U6YixyZWNvcmQ6Y30pKSksLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLHtrZXk6XCJvcHRpb25zXCIsY2xhc3NOYW1lOlwib3B0aW9uc1wifSxkPy8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFBsYWNlaG9sZGVyLHtzdHlsZTp7aGVpZ2h0OjE0fX0pOi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlbGF0aW9uUmVjb3JkSW5MaXN0QWN0aW9ucyx7cmVjb3JkOmMscmVzb3VyY2U6Yn0pKSl9OyIsImltcG9ydHtCb3gsVGFibGUsVGFibGVCb2R5fWZyb21cIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtpbXBvcnR7UmVjb3Jkc1RhYmxlSGVhZGVyLHVzZVF1ZXJ5UGFyYW1zfWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3QgZnJvbVwicmVhY3RcIjtpbXBvcnR7dXNlUmVsYXRpb25Db25maWd9ZnJvbVwiLi4vLi4vcHJvdmlkZXJzL1JlbGF0aW9uQ29uZmlnUHJvdmlkZXIuanNcIjtpbXBvcnR7UmVsYXRpb25Ob1JlY29yZHN9ZnJvbVwiLi9SZWxhdGlvbk5vUmVjb3Jkcy5qc1wiO2ltcG9ydHtSZWxhdGlvblJlY29yZEluTGlzdH1mcm9tXCIuL1JlbGF0aW9uUmVjb3JkSW5MaXN0LmpzXCI7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uUmVjb3Jkc1RhYmxlPWE9Pntjb25zdHt0YXJnZXRSZXNvdXJjZTpiLHJlY29yZHM6Yyxpc0xvYWRpbmc6ZH09YSx7b3duZXJSZXNvdXJjZTplfT11c2VSZWxhdGlvbkNvbmZpZygpLHtkaXJlY3Rpb246Zixzb3J0Qnk6Z309dXNlUXVlcnlQYXJhbXMoKTtpZighYy5sZW5ndGgmJiFkKXJldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlbGF0aW9uTm9SZWNvcmRzLHtyZXNvdXJjZTpifSk7Y29uc3QgaD17Li4uYixsaXN0UHJvcGVydGllczpiLmxpc3RQcm9wZXJ0aWVzLmZpbHRlcigoe3JlZmVyZW5jZTphfSk9PmEhPT1lLmlkKX07cmV0dXJuLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LHtvdmVyZmxvdzpcImF1dG9cIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUse1wiZGF0YS1jc3NcIjpcInJlbGF0aW9ucy10YWJsZVwifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWNvcmRzVGFibGVIZWFkZXIse3Byb3BlcnRpZXM6aC5saXN0UHJvcGVydGllcyx0aXRsZVByb3BlcnR5OmgudGl0bGVQcm9wZXJ0eSxkaXJlY3Rpb246Zixzb3J0Qnk6Z30pLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSx7XCJkYXRhLWNzc1wiOlwicmVsYXRpb25zLXRhYmxlLWJvZHlcIn0sYy5tYXAoYT0+LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVsYXRpb25SZWNvcmRJbkxpc3Qse2tleTphLmlkLHJlY29yZDphLHJlc291cmNlOmgsaXNMb2FkaW5nOmR9KSkpKSl9OyIsImltcG9ydHtCb3gsQnV0dG9uLEljb259ZnJvbVwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO2ltcG9ydHtBY3Rpb25CdXR0b24sdXNlVHJhbnNsYXRpb259ZnJvbVwiYWRtaW5qc1wiO2ltcG9ydCBSZWFjdCBmcm9tXCJyZWFjdFwiO2ltcG9ydHt1c2VSZWxhdGlvbkNvbmZpZ31mcm9tXCIuLi8uLi9wcm92aWRlcnMvUmVsYXRpb25Db25maWdQcm92aWRlci5qc1wiO2ltcG9ydHt1c2VSZWRpcmVjdFVybH1mcm9tXCIuLi9zaGFyZWQvdXNlUmVkaXJlY3RVcmwuanNcIjtleHBvcnQgY29uc3QgUmVsYXRpb25SZXNvdXJjZUFjdGlvbnM9YT0+e2NvbnN0e3RhcmdldFJlc291cmNlOmJ9PWEse293bmVyUmVjb3JkOmMscmVsYXRpb25zOmQscmVsYXRpb246ZX09dXNlUmVsYXRpb25Db25maWcoKSx7dGE6Zn09dXNlVHJhbnNsYXRpb24oKSxnPXVzZVJlZGlyZWN0VXJsKCksaD1kW2VdLnRhcmdldC5yZXNvdXJjZUlkLGk9ZFtlXS50YXJnZXQuam9pbktleTtpZighaSlyZXR1cm4gbnVsbDtjb25zdCBqPWIucmVzb3VyY2VBY3Rpb25zLmZpbHRlcigoe25hbWU6YX0pPT5cIm5ld1wiPT09YSk7cmV0dXJuIGoubGVuZ3RoPy8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCx7ZmxleDohMCxtYjpcInhsXCIsanVzdGlmeUNvbnRlbnQ6XCJlbmRcIn0sai5tYXAoYT0+LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQWN0aW9uQnV0dG9uLHtrZXk6YS5uYW1lLGFjdGlvbjphLHJlc291cmNlSWQ6aCxxdWVyeVBhcmFtczp7W2ldOmMuaWQscmVkaXJlY3RVcmw6Z319LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbix7dmFyaWFudDpcImNvbnRhaW5lZFwifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChJY29uLHtpY29uOmEuaWNvbn0pLGYoYS5uYW1lLGIuaWQpKSkpKTpudWxsfTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBwcmV0dGllci9wcmV0dGllciAqL2ltcG9ydHtCb3gsTG9hZGVyLFBhZ2luYXRpb24sdXNlVGFic31mcm9tXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7aW1wb3J0e3VzZVF1ZXJ5UGFyYW1zfWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3QgZnJvbVwicmVhY3RcIjtpbXBvcnR7dXNlU2VsZWN0b3J9ZnJvbVwicmVhY3QtcmVkdXhcIjtpbXBvcnR7dXNlUmVsYXRpb25SZWNvcmRzfWZyb21cIi4uLy4uL2hvb2tzL3VzZVJlbGF0aW9uUmVjb3Jkcy5qc1wiO2ltcG9ydHt1c2VSZWxhdGlvbkNvbmZpZ31mcm9tXCIuLi8uLi9wcm92aWRlcnMvUmVsYXRpb25Db25maWdQcm92aWRlci5qc1wiO2ltcG9ydHtSZWxhdGlvblR5cGV9ZnJvbVwiLi4vLi4vdHlwZXMvaW5kZXguanNcIjtpbXBvcnR7UmVsYXRpb25SZWNvcmRzVGFibGUgYXMgTWFueVRvTWFueVJlbGF0aW9uUmVjb3Jkc1RhYmxlfWZyb21cIi4uL21hbnktdG8tbWFueS9SZWxhdGlvblJlY29yZHNUYWJsZS5qc1wiO2ltcG9ydHtSZWxhdGlvblJlc291cmNlQWN0aW9ucyBhcyBNYW55VG9NYW55UmVsYXRpb25SZXNvdXJjZUFjdGlvbnN9ZnJvbVwiLi4vbWFueS10by1tYW55L1JlbGF0aW9uUmVzb3VyY2VBY3Rpb25zLmpzXCI7aW1wb3J0e1JlbGF0aW9uUmVjb3Jkc1RhYmxlIGFzIE9uZVRvTWFueVJlbGF0aW9uUmVjb3Jkc1RhYmxlfWZyb21cIi4uL29uZS10by1tYW55L1JlbGF0aW9uUmVjb3Jkc1RhYmxlLmpzXCI7aW1wb3J0e1JlbGF0aW9uUmVzb3VyY2VBY3Rpb25zIGFzIE9uZVRvTWFueVJlbGF0aW9uUmVzb3VyY2VBY3Rpb25zfWZyb21cIi4uL29uZS10by1tYW55L1JlbGF0aW9uUmVzb3VyY2VBY3Rpb25zLmpzXCI7ZXhwb3J0IGNvbnN0IFJlbGF0aW9uVGFiPSgpPT57Y29uc3R7cmVsYXRpb246YSxvd25lclJlY29yZDpiLG93bmVyUmVzb3VyY2U6YyxyZWxhdGlvbnM6ZH09dXNlUmVsYXRpb25Db25maWcoKSxlPXVzZVNlbGVjdG9yKGE9PmEucmVzb3VyY2VzKSx7c3RvcmVQYXJhbXM6Zn09dXNlUXVlcnlQYXJhbXMoKSx7Y3VycmVudFRhYjpnfT11c2VUYWJzKCksaD1kW2FdLnRhcmdldC5yZXNvdXJjZUlkLGk9ZFthXS5qdW5jdGlvbj8udGhyb3VnaFJlc291cmNlSWQsaj1kW2FdLnR5cGUse2RhdGE6ayxpc0xvYWRpbmc6bH09dXNlUmVsYXRpb25SZWNvcmRzKHtyZWNvcmQ6YixyZWxhdGlvbjphLHJlc291cmNlOmMsdGFyZ2V0UmVzb3VyY2VJZDpoLHRhYjpnfSksbT1hPT5mKHtwYWdlOmEudG9TdHJpbmcoKX0pO2lmKGchPT1hKXJldHVybiBudWxsO2lmKCFrKXJldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KExvYWRlcixudWxsKTtpZihqPT09UmVsYXRpb25UeXBlLk9uZVRvTWFueSl7Y29uc3QgYT1lLmZpbmQoYT0+YS5pZD09PWgpO2lmKCFhKXJldHVybiBudWxsO2NvbnN0e3JlY29yZHM6YixtZXRhOnt0b3RhbDpjLHBhZ2U6ZCxwZXJQYWdlOmZ9fT1rO3JldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCx7cHk6XCJ4bFwifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChPbmVUb01hbnlSZWxhdGlvblJlc291cmNlQWN0aW9ucyx7dGFyZ2V0UmVzb3VyY2U6YX0pLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KE9uZVRvTWFueVJlbGF0aW9uUmVjb3Jkc1RhYmxlLHt0YXJnZXRSZXNvdXJjZTphLHJlY29yZHM6Yixpc0xvYWRpbmc6bH0pLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCx7ZmxleDohMCxqdXN0aWZ5Q29udGVudDpcImNlbnRlclwiLG10OlwieGxcIn0sLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUGFnaW5hdGlvbix7dG90YWw6YyxwZXJQYWdlOmYscGFnZTorZCxvbkNoYW5nZTptfSkpKX1pZihqPT09UmVsYXRpb25UeXBlLk1hbnlUb01hbnkpe2lmKCFpKXJldHVybiBudWxsO2NvbnN0IGE9ZS5maW5kKGE9PmEuaWQ9PT1oKSxiPWUuZmluZChhPT5hLmlkPT09aSk7aWYoIWF8fCFiKXJldHVybiBudWxsO2NvbnN0e3JlY29yZHM6ZCxtZXRhOnt0b3RhbDpmLHBhZ2U6ZyxwZXJQYWdlOmp9fT1rO3JldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCx7cHk6XCJ4bFwifSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChNYW55VG9NYW55UmVsYXRpb25SZXNvdXJjZUFjdGlvbnMse3RhcmdldFJlc291cmNlOmEsb3duZXJSZXNvdXJjZTpjLGp1bmN0aW9uUmVzb3VyY2U6Yn0pLC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KE1hbnlUb01hbnlSZWxhdGlvblJlY29yZHNUYWJsZSx7dGFyZ2V0UmVzb3VyY2U6YSxyZWNvcmRzOmQsaXNMb2FkaW5nOmx9KSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gse2ZsZXg6ITAsanVzdGlmeUNvbnRlbnQ6XCJjZW50ZXJcIixtdDpcInhsXCJ9LC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFBhZ2luYXRpb24se3RvdGFsOmYscGVyUGFnZTpqLHBhZ2U6K2csb25DaGFuZ2U6bX0pKSl9cmV0dXJuIG51bGx9OyIsImltcG9ydHtUYWIsVGFic31mcm9tXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7aW1wb3J0e3VzZVF1ZXJ5UGFyYW1zLHVzZVRyYW5zbGF0aW9ufWZyb21cImFkbWluanNcIjtpbXBvcnQgUmVhY3Qse21lbW8sdXNlQ2FsbGJhY2t9ZnJvbVwicmVhY3RcIjtpbXBvcnR7UmVsYXRpb25Db25maWdQcm92aWRlcn1mcm9tXCIuLi9wcm92aWRlcnMvUmVsYXRpb25Db25maWdQcm92aWRlci5qc1wiO2ltcG9ydHtSZWxhdGlvblRhYn1mcm9tXCIuL3NoYXJlZC9SZWxhdGlvblRhYi5qc1wiO2NvbnN0IFJlbGF0aW9uc1Nob3dQcm9wZXJ0eUNvbXBvbmVudD1hPT57Y29uc3R7cmVzb3VyY2U6YixyZWNvcmQ6Yyxwcm9wZXJ0eTpkfT1hLHtpZDplLHByb3BlcnRpZXM6Zn09Yix7cmVsYXRpb25zOmd9PWZbZC5wYXRoXS5wcm9wcyxoPU9iamVjdC5rZXlzKGcpLHt0YWI6aj1oWzBdLHN0b3JlUGFyYW1zOml9PXVzZVF1ZXJ5UGFyYW1zKCkse3RsOmt9PXVzZVRyYW5zbGF0aW9uKCksbD11c2VDYWxsYmFjayhhPT57aSh7dGFiOmEsc29ydEJ5OnZvaWQgMCxkaXJlY3Rpb246dm9pZCAwLHJlZGlyZWN0VXJsOnZvaWQgMH0pfSxbXSk7cmV0dXJuIGMmJmgubGVuZ3RoPy8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRhYnMse2N1cnJlbnRUYWI6aixvbkNoYW5nZTpsfSxoLm1hcChhPT4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChUYWIse2tleTphLGlkOmEsbGFiZWw6ayhhLGUpfSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWxhdGlvbkNvbmZpZ1Byb3ZpZGVyLHtyZWxhdGlvbjphLHJlbGF0aW9uczpnLG93bmVyUmVzb3VyY2U6Yixvd25lclJlY29yZDpjfSwvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWxhdGlvblRhYixudWxsKSkpKSk6bnVsbH07ZXhwb3J0IGRlZmF1bHQvKiNfX1BVUkVfXyovbWVtbyhSZWxhdGlvbnNTaG93UHJvcGVydHlDb21wb25lbnQpOyIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL2ltcG9ydCBSZWFjdCBmcm9tXCJyZWFjdFwiO2ltcG9ydHttZW1vfWZyb21cInJlYWN0XCI7Ly8gVE9ETzogW0FKUy00MDBdIEludHJvZHVjZSByZWxhdGlvbnMgZWRpdFxuY29uc3QgUmVsYXRpb25zRWRpdFByb3BlcnR5Q29tcG9uZW50PSgpPT4vKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCxudWxsKTtleHBvcnQgZGVmYXVsdC8qI19fUFVSRV9fKi9tZW1vKFJlbGF0aW9uc0VkaXRQcm9wZXJ0eUNvbXBvbmVudCk7IiwiaW1wb3J0e0JhZGdlfWZyb21cIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtpbXBvcnR7dXNlVHJhbnNsYXRpb259ZnJvbVwiYWRtaW5qc1wiO2ltcG9ydCBSZWFjdCx7bWVtb31mcm9tXCJyZWFjdFwiOy8vIFRPRE86IFtBSlMtNDAwXSBJbnRyb2R1Y2UgcmVsYXRpb25zIGVkaXRcbmNvbnN0IFJlbGF0aW9uc0xpc3RQcm9wZXJ0eUNvbXBvbmVudD1hPT57Y29uc3R7cmVzb3VyY2U6e3Byb3BlcnRpZXM6Y30scHJvcGVydHk6Yn09YSx7cmVsYXRpb25zVGFyZ2V0czpkfT1jW2IucGF0aF0ucHJvcHMsZT1PYmplY3QudmFsdWVzKGQpLHt0bDpmfT11c2VUcmFuc2xhdGlvbigpO3JldHVybi8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LG51bGwsZS5tYXAoKHtyZXNvdXJjZUlkOmF9KT0+LyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQmFkZ2Use2tleTphLG1yOlwic21cIn0sZihhLGEpKSkpfTtleHBvcnQgZGVmYXVsdC8qI19fUFVSRV9fKi9tZW1vKFJlbGF0aW9uc0xpc3RQcm9wZXJ0eUNvbXBvbmVudCk7IiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgUmVsYXRpb25zU2hvd1Byb3BlcnR5Q29tcG9uZW50IGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYWRtaW5qcytyZWxhdGlvbnNAMS4xLjJfYWRtaW5qc0A3LjguMTVfQHR5cGVzK2JhYmVsX19jb3JlQDcuMjAuNV9AdHlwZXMrcmVhY3QtZG9tQDE5LjAuNF9AdHlfeWx3N2kzeXlnbW91aWJlNXF5bG1kanI2ZTQvbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3JlbGF0aW9ucy9saWIvY29tcG9uZW50cy9SZWxhdGlvbnNTaG93UHJvcGVydHlDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJlbGF0aW9uc1Nob3dQcm9wZXJ0eUNvbXBvbmVudCA9IFJlbGF0aW9uc1Nob3dQcm9wZXJ0eUNvbXBvbmVudFxuaW1wb3J0IFJlbGF0aW9uc0VkaXRQcm9wZXJ0eUNvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGFkbWluanMrcmVsYXRpb25zQDEuMS4yX2FkbWluanNANy44LjE1X0B0eXBlcytiYWJlbF9fY29yZUA3LjIwLjVfQHR5cGVzK3JlYWN0LWRvbUAxOS4wLjRfQHR5X3lsdzdpM3l5Z21vdWliZTVxeWxtZGpyNmU0L25vZGVfbW9kdWxlcy9AYWRtaW5qcy9yZWxhdGlvbnMvbGliL2NvbXBvbmVudHMvUmVsYXRpb25zRWRpdFByb3BlcnR5Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5SZWxhdGlvbnNFZGl0UHJvcGVydHlDb21wb25lbnQgPSBSZWxhdGlvbnNFZGl0UHJvcGVydHlDb21wb25lbnRcbmltcG9ydCBSZWxhdGlvbnNMaXN0UHJvcGVydHlDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhZG1pbmpzK3JlbGF0aW9uc0AxLjEuMl9hZG1pbmpzQDcuOC4xNV9AdHlwZXMrYmFiZWxfX2NvcmVANy4yMC41X0B0eXBlcytyZWFjdC1kb21AMTkuMC40X0B0eV95bHc3aTN5eWdtb3VpYmU1cXlsbWRqcjZlNC9ub2RlX21vZHVsZXMvQGFkbWluanMvcmVsYXRpb25zL2xpYi9jb21wb25lbnRzL1JlbGF0aW9uc0xpc3RQcm9wZXJ0eUNvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUmVsYXRpb25zTGlzdFByb3BlcnR5Q29tcG9uZW50ID0gUmVsYXRpb25zTGlzdFByb3BlcnR5Q29tcG9uZW50Il0sIm5hbWVzIjpbIlJlbGF0aW9uQ29uZmlnUHJvdmlkZXIiLCJjaGlsZHJlbiIsImEiLCJiIiwiYyIsImQiLCJ1c2VTdGF0ZSIsImUiLCJ1c2VDYWxsYmFjayIsIkRhdGUiLCJnZXRUaW1lIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiT3duZXJSZWNvcmRDb250ZXh0IiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInJlZnJlc2hUb2tlbiIsInJlZnJlc2giLCJjcmVhdGVDb250ZXh0IiwidXNlUmVsYXRpb25Db25maWciLCJ1c2VDb250ZXh0IiwiRXJyb3IiLCJhcGkiLCJBcGlDbGllbnQiLCJ1c2VSZWxhdGlvblJlY29yZHMiLCJyZWNvcmQiLCJyZXNvdXJjZSIsInRhcmdldFJlc291cmNlSWQiLCJ0YWIiLCJyZWxhdGlvbiIsImYiLCJnIiwiaCIsImkiLCJqIiwiayIsImRpcmVjdGlvbiIsImwiLCJzb3J0QnkiLCJtIiwicGFnZSIsIm4iLCJwYXJzZWRRdWVyeSIsIm8iLCJ1c2VRdWVyeVBhcmFtcyIsInAiLCJ1c2VOb3RpY2UiLCJ1c2VFZmZlY3QiLCJyZWNvcmRBY3Rpb24iLCJhY3Rpb25OYW1lIiwicmVjb3JkSWQiLCJpZCIsInJlc291cmNlSWQiLCJwYXJhbXMiLCJ0aGVuIiwiZGF0YSIsInJlY29yZHMiLCJtZXRhIiwibm90aWNlIiwiZmluYWxseSIsImlzTG9hZGluZyIsIlJlbGF0aW9uVHlwZSIsIk9uZVRvTWFueSIsIk1hbnlUb01hbnkiLCJNZXNzYWdlcyIsIk1pc3NpbmdDb25maWd1cmF0aW9uIiwiTWlzc2luZ1JlY29yZElkIiwiSW52YWxpZFJlbGF0aW9uVHlwZSIsIkpvaW5LZXlNaXNzaW5nIiwiTm9SZWxhdGlvblJlY29yZHNUaXRsZSIsIk5vUmVsYXRpb25SZWNvcmRzIiwiSnVuY3Rpb25NaXNzaW5nIiwiSnVuY3Rpb25SZXNvdXJjZUlkTWlzc2luZyIsIkp1bmN0aW9uUmVzb3VyY2VNaXNzaW5nIiwiQ2hvb3NlSXRlbVN1YnRpdGxlIiwiTWFueVRvTWFueVJlbGF0aW9uQWxyZWFkeUV4aXN0cyIsIlJlbGF0aW9uU3VjY2Vzc2Z1bGx5QWRkZWQiLCJSZWxhdGlvblN1Y2Nlc3NmdWxseURlbGV0ZWQiLCJRdWVyeVBhcmFtc01pc3NpbmciLCJKdW5jdGlvblJlY29yZE1pc3NpbmciLCJMYWJlbHMiLCJDaG9vc2VJdGVtSGVhZGVyIiwiRGVsZXRlUmVsYXRpb25IZWFkZXIiLCJBY3Rpb25zIiwiQWRkSXRlbSIsIlJlbW92ZVJlbGF0aW9uIiwiUmVtb3ZlUmVjb3JkIiwiUmVsYXRpb25Ob1JlY29yZHMiLCJuYW1lIiwicmVzb3VyY2VBY3Rpb25zIiwib3duZXJSZWNvcmQiLCJyZWxhdGlvbnMiLCJ0YiIsInRtIiwidXNlVHJhbnNsYXRpb24iLCJ0YXJnZXQiLCJqdW5jdGlvbiIsImpvaW5LZXkiLCJpbnZlcnNlSm9pbktleSIsImZpbmQiLCJJbmZvQm94IiwidGl0bGUiLCJpbGx1c3RyYXRpb24iLCJUZXh0IiwibWIiLCJyZWxhdGlvbk5hbWUiLCJBY3Rpb25CdXR0b24iLCJhY3Rpb24iLCJxdWVyeVBhcmFtcyIsImp1bmN0aW9uUmVzb3VyY2VJZCIsInRocm91Z2hSZXNvdXJjZUlkIiwicmVkaXJlY3RVcmwiLCJsb2NhdGlvbiIsImhyZWYiLCJCdXR0b24iLCJ2YXJpYW50IiwiSWNvbiIsImljb24iLCJ1c2VSZWRpcmVjdFVybCIsIlVSTCIsInNlYXJjaFBhcmFtcyIsImdldCIsImRlbGV0ZSIsIlJlbGF0aW9uUmVjb3JkSW5MaXN0QWN0aW9ucyIsInJlY29yZEFjdGlvbnMiLCJvd25lclJlc291cmNlIiwiZGVsZXRlT3B0aW9ucyIsImVuYWJsZURlbGV0ZVJlbGF0aW9uIiwiZW5hYmxlRGVsZXRlUmVsYXRlZFJlY29yZCIsInRhIiwidGwiLCJxIiwiciIsInMiLCJ0YXJnZXRSZWNvcmRJZCIsInQiLCJ1IiwidiIsImxhYmVsIiwib25DbGljayIsInoiLCJ3IiwiY29sb3IiLCJ0eXBlIiwieCIsInB1c2giLCJ5IiwiQSIsIm9uT3ZlcmxheUNsaWNrIiwib25DbG9zZSIsImJ1dHRvbnMiLCJCIiwic2hvdyIsImVkaXQiLCJDIiwiZmlsdGVyIiwiQm94IiwiZmxleCIsIm1hcCIsImtleSIsInNpemUiLCJyb3VuZGVkIiwibGVuZ3RoIiwiRnJhZ21lbnQiLCJNb2RhbCIsIlJlbGF0aW9uUmVjb3JkSW5MaXN0IiwiVGFibGVSb3ciLCJqb2luIiwiVGFibGVDZWxsIiwid2lkdGgiLCJsaXN0UHJvcGVydGllcyIsInN0eWxlIiwiY3Vyc29yIiwid2hpdGVTcGFjZSIsInByb3BlcnR5UGF0aCIsImRpc3BsYXkiLCJQbGFjZWhvbGRlciIsImhlaWdodCIsIkJhc2VQcm9wZXJ0eUNvbXBvbmVudCIsIndoZXJlIiwicHJvcGVydHkiLCJjbGFzc05hbWUiLCJSZWxhdGlvblJlY29yZHNUYWJsZSIsInRhcmdldFJlc291cmNlIiwicmVmZXJlbmNlIiwib3ZlcmZsb3ciLCJUYWJsZSIsIlJlY29yZHNUYWJsZUhlYWRlciIsInByb3BlcnRpZXMiLCJ0aXRsZVByb3BlcnR5IiwiVGFibGVCb2R5IiwiQWRkSXRlbU1vZGFsIiwib25DbG9zZU1vZGFsIiwiZmxleERpcmVjdGlvbiIsIm10IiwiTWVzc2FnZUJveCIsIm1lc3NhZ2UiLCJvcHRpb25zIiwibXkiLCJTZWxlY3RBc3luYyIsImNhY2hlT3B0aW9ucyIsImRlZmF1bHRPcHRpb25zIiwibG9hZE9wdGlvbnMiLCJzZWFyY2hSZWNvcmRzIiwicXVlcnkiLCJvbkNoYW5nZSIsImlzQ2xlYXJhYmxlIiwianVzdGlmeUNvbnRlbnQiLCJtciIsInRhcmdldElkIiwiZGlzYWJsZWQiLCJSZWxhdGlvblJlc291cmNlQWN0aW9ucyIsImp1bmN0aW9uUmVzb3VyY2UiLCJzdWJUaXRsZSIsIkFkZEl0ZW1Nb2RhbENvbnRlbnQiLCJ1c2VOYXZpZ2F0ZSIsInBhdGhuYW1lIiwic2VhcmNoIiwidXNlTG9jYXRpb24iLCJhY3Rpb25QZXJmb3JtZWQiLCJWaWV3SGVscGVycyIsInJlY29yZEFjdGlvblVybCIsImVuY29kZVVSSUNvbXBvbmVudCIsIlJlbGF0aW9uVGFiIiwidXNlU2VsZWN0b3IiLCJyZXNvdXJjZXMiLCJzdG9yZVBhcmFtcyIsImN1cnJlbnRUYWIiLCJ1c2VUYWJzIiwidG9TdHJpbmciLCJMb2FkZXIiLCJ0b3RhbCIsInBlclBhZ2UiLCJweSIsIk9uZVRvTWFueVJlbGF0aW9uUmVzb3VyY2VBY3Rpb25zIiwiT25lVG9NYW55UmVsYXRpb25SZWNvcmRzVGFibGUiLCJQYWdpbmF0aW9uIiwiTWFueVRvTWFueVJlbGF0aW9uUmVzb3VyY2VBY3Rpb25zIiwiTWFueVRvTWFueVJlbGF0aW9uUmVjb3Jkc1RhYmxlIiwiUmVsYXRpb25zU2hvd1Byb3BlcnR5Q29tcG9uZW50IiwicGF0aCIsInByb3BzIiwiT2JqZWN0Iiwia2V5cyIsIlRhYnMiLCJUYWIiLCJtZW1vIiwiUmVsYXRpb25zRWRpdFByb3BlcnR5Q29tcG9uZW50IiwiUmVsYXRpb25zTGlzdFByb3BlcnR5Q29tcG9uZW50IiwicmVsYXRpb25zVGFyZ2V0cyIsInZhbHVlcyIsIkJhZGdlIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0NBQXFILE1BQU1BLHNCQUFzQixHQUFDQSxDQUFDO0NBQUNDLEVBQUFBLFFBQVEsRUFBQ0MsQ0FBQztHQUFDLEdBQUdDO0NBQUMsQ0FBQyxLQUFHO0dBQUMsTUFBSyxDQUFDQyxDQUFDLEVBQUNDLENBQUMsQ0FBQyxHQUFDQyxjQUFRLENBQUMsQ0FBQyxDQUFDO0tBQUNDLENBQUMsR0FBQ0MsaUJBQVcsQ0FBQyxNQUFJO09BQUNILENBQUMsQ0FBQyxJQUFJSSxJQUFJLEVBQUUsQ0FBQ0MsT0FBTyxFQUFFLENBQUM7TUFBQyxFQUFDLEVBQUUsQ0FBQztHQUFDLG9CQUFtQkMsc0JBQUssQ0FBQ0MsYUFBYSxDQUFDQyxrQkFBa0IsQ0FBQ0MsUUFBUSxFQUFDO0NBQUNDLElBQUFBLEtBQUssRUFBQztDQUFDLE1BQUEsR0FBR1osQ0FBQztDQUFDYSxNQUFBQSxZQUFZLEVBQUNaLENBQUM7Q0FBQ2EsTUFBQUEsT0FBTyxFQUFDVjtDQUFDO0lBQUUsRUFBQ0wsQ0FBQyxDQUFDO0NBQUEsQ0FBQztDQUFDLE1BQU1XLGtCQUFrQixnQkFBY0ssbUJBQWEsQ0FBQyxJQUFJLENBQUM7Q0FBUSxNQUFNQyxpQkFBaUIsR0FBQ0EsTUFBSTtDQUFDLEVBQUEsTUFBTWpCLENBQUMsR0FBQ2tCLGdCQUFVLENBQUNQLGtCQUFrQixDQUFDO0dBQUMsSUFBRyxDQUFDWCxDQUFDLEVBQUMsTUFBTSxJQUFJbUIsS0FBSyxDQUFDLDBEQUEwRCxDQUFDO0NBQUMsRUFBQSxPQUFPbkIsQ0FBQztDQUFBLENBQUM7O0NDQTFaLE1BQU1vQixLQUFHLEdBQUMsSUFBSUMsaUJBQVMsRUFBQTtDQUFRLE1BQU1DLGtCQUFrQixHQUFDdEIsQ0FBQyxJQUFFO0dBQUMsTUFBSztDQUFDdUIsTUFBQUEsTUFBTSxFQUFDdEIsQ0FBQztDQUFDdUIsTUFBQUEsUUFBUSxF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Q0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUk7Q0FBQSxDQUFDO0FBQUMsd0NBQWMsYUFBYXVCLFVBQUksQ0FBQ1AsOEJBQThCLENBQUM7O0NDQzM3QixNQUFNUSw4QkFBOEIsR0FBQ0EsbUJBQWlCNU8sc0JBQUssQ0FBQ0MsYUFBYSxDQUFDRCxzQkFBSyxDQUFDd0osUUFBUSxFQUFDLElBQUksQ0FBQztBQUFDLHdDQUFjLGFBQWFtRixVQUFJLENBQUNDLDhCQUE4QixDQUFDOztDQ0E5SixNQUFNQyw4QkFBOEIsR0FBQ3RQLENBQUMsSUFBRTtHQUFDLE1BQUs7Q0FBQ3dCLE1BQUFBLFFBQVEsRUFBQztDQUFDa0ssUUFBQUEsVUFBVSxFQUFDeEw7UUFBRTtDQUFDZ0wsTUFBQUEsUUFBUSxFQUFDakw7Q0FBQyxLQUFDLEdBQUNELENBQUM7Q0FBQyxJQUFBO0NBQUN1UCxNQUFBQSxnQkFBZ0IsRUFBQ3BQO01BQUUsR0FBQ0QsQ0FBQyxDQUFDRCxDQUFDLENBQUM2TyxJQUFJLENBQUMsQ0FBQ0MsS0FBSztDQUFDMU8sSUFBQUEsQ0FBQyxHQUFDMk8sTUFBTSxDQUFDUSxNQUFNLENBQUNyUCxDQUFDLENBQUM7Q0FBQyxJQUFBO0NBQUM2SCxNQUFBQSxFQUFFLEVBQUNwRztNQUFFLEdBQUNnRSxzQkFBYyxFQUFFO0NBQUMsRUFBQSxvQkFBbUJuRixzQkFBSyxDQUFDQyxhQUFhLENBQUNELHNCQUFLLENBQUN3SixRQUFRLEVBQUMsSUFBSSxFQUFDNUosQ0FBQyxDQUFDdUosR0FBRyxDQUFDLENBQUM7Q0FBQzFHLElBQUFBLFVBQVUsRUFBQ2xEO0NBQUMsR0FBQyxrQkFBZ0JTLHNCQUFLLENBQUNDLGFBQWEsQ0FBQytPLGtCQUFLLEVBQUM7Q0FBQzVGLElBQUFBLEdBQUcsRUFBQzdKLENBQUM7Q0FBQzhNLElBQUFBLEVBQUUsRUFBQztJQUFLLEVBQUNsTCxDQUFDLENBQUM1QixDQUFDLEVBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUFBLENBQUM7QUFBQyx3Q0FBYyxhQUFhb1AsVUFBSSxDQUFDRSw4QkFBOEIsQ0FBQzs7Q0NEelhJLE9BQU8sQ0FBQ0MsY0FBYyxHQUFHLEVBQUU7Q0FFM0JELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDZCw4QkFBOEIsR0FBR0EsZ0NBQThCO0NBRXRGYSxPQUFPLENBQUNDLGNBQWMsQ0FBQ04sOEJBQThCLEdBQUdBLGdDQUE4QjtDQUV0RkssT0FBTyxDQUFDQyxjQUFjLENBQUNMLDhCQUE4QixHQUFHQSxnQ0FBOEI7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOV19
