const navs = [
   {
      id: 1,
      label: 'Home',
      url: '/home',
      children: [
         {
            id: 1,
            label: 'sub1',
            url: '/sub1',
            children: [
               {
                  id: 1,
                  label: 'third1',
                  url: '/third1',
               },
               {
                  id: 2,
                  label: 'third2',
                  url: '/third2',
               },
               {
                  id: 3,
                  label: 'third3',
                  url: '/third3',
               },
            ],
         },
         {
            id: 2,
            label: 'sub2',
            url: '/sub2',
            children: [],
         },
         {
            id: 3,
            label: 'sub3',
            url: '/sub3',
            children: [
               {
                  id: 1,
                  label: 'third1',
                  url: '/third1',
               },
               {
                  id: 2,
                  label: 'third2',
                  url: '/third2',
               },
               {
                  id: 3,
                  label: 'third3',
                  url: '/third3',
               },
            ],
         },
      ],
   },
   {
      id: 2,
      label: 'Shop',
      url: '/shop',
   },
   {
      id: 3,
      label: 'Pages',
      url: '/page',
      children: [
         {
            id: 1,
            label: 'sub1',
            url: '/sub1',
            children: [
               {
                  id: 1,
                  label: 'third1',
                  url: '/third1',
               },
               {
                  id: 2,
                  label: 'third2',
                  url: '/third2',
               },
               {
                  id: 3,
                  label: 'third3',
                  url: '/third3',
               },
            ],
         },
         {
            id: 2,
            label: 'sub2',
            url: '/sub2',
            children: [],
         },
         {
            id: 3,
            label: 'sub3',
            url: '/sub3',
            children: [
               {
                  id: 1,
                  label: 'third1',
                  url: '/third1',
               },
               {
                  id: 2,
                  label: 'third2',
                  url: '/third2',
               },
               {
                  id: 3,
                  label: 'third3',
                  url: '/third3',
               },
            ],
         },
      ],
   },
];

export default navs;
