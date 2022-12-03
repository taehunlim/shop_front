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
                  id: 4,
                  label: 'third1',
                  url: '/third1',
               },
               {
                  id: 5,
                  label: 'third2',
                  url: '/third2',
               },
               {
                  id: 6,
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
      children: [],
   },
   {
      id: 3,
      label: 'Pages',
      url: '/page',
      children: [
         {
            id: 4,
            label: 'sub1',
            url: '/sub1',
            children: [
               {
                  id: 7,
                  label: 'third1',
                  url: '/third1',
               },
               {
                  id: 8,
                  label: 'third2',
                  url: '/third2',
               },
               {
                  id: 9,
                  label: 'third3',
                  url: '/third3',
               },
            ],
         },
         {
            id: 5,
            label: 'sub2',
            url: '/sub2',
            children: [],
         },
         {
            id: 6,
            label: 'sub3',
            url: '/sub3',
            children: [
               {
                  id: 10,
                  label: 'third1',
                  url: '/third1',
               },
               {
                  id: 11,
                  label: 'third2',
                  url: '/third2',
               },
               {
                  id: 12,
                  label: 'third3',
                  url: '/third3',
               },
            ],
         },
      ],
   },
];

export default navs;
