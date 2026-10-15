import { refDebounced, useDebounceFn } from '@vueuse/core';

export const useLazyLoad = (
  items: Ref<any[] | undefined>,
  batchSize: number = 15,
  selectedValue?: Ref<any>,
  valueKey?: string
) => {
  const displayedCount = ref(batchSize);
  const isActive = ref(true);
  const searchQuery = ref('');
  const debouncedSearch = refDebounced(searchQuery, 200);

  // Helper to filter valid items
  const filterValidItems = (itemsList: any[] | undefined) => {
    if (!itemsList || !isActive.value) return [];

    return itemsList.filter(item => {
      if (item === null || item === undefined) return false;
      // If item is an object, check if it has valid properties
      if (typeof item === 'object') {
        return Object.keys(item).length > 0;
      }
      // If item is a primitive, check it's not an empty string
      return item !== '';
    });
  };

  // Get valid items (memoized)
  const validItems = computed(() => {
    if (!isActive.value) return [];
    return filterValidItems(items.value);
  });

  // Filtered items based on search query
  const searchedItems = computed(() => {
    if (!debouncedSearch.value) return validItems.value;

    const query = debouncedSearch.value.toLowerCase();
    return validItems.value.filter(item => {
      if (typeof item === 'object' && item !== null) {
        const searchText = String(item.name || item.label || item.title || '');
        return searchText.toLowerCase().includes(query);
      }
      return String(item).toLowerCase().includes(query);
    });
  });

  // Show items in batches, ensuring selected items are included
  const displayedItems = computed(() => {
    // If searching, show all search results
    if (debouncedSearch.value) return searchedItems.value;

    if (validItems.value.length <= batchSize) return validItems.value;

    const slicedItems = validItems.value.slice(0, displayedCount.value);

    // If there's a selected value, ensure it's in the displayed items
    if (selectedValue?.value) {
      const selectedValues = Array.isArray(selectedValue.value)
        ? selectedValue.value
        : [selectedValue.value];

      selectedValues.forEach(val => {
        const isInDisplayed = slicedItems.some(item => {
          if (valueKey) {
            return item[valueKey] === val;
          }
          return item === val;
        });

        if (!isInDisplayed) {
          // Find the selected item in full list and add it
          const selectedItem = validItems.value.find(item => {
            if (valueKey) {
              return item[valueKey] === val;
            }
            return item === val;
          });

          if (selectedItem && !slicedItems.includes(selectedItem)) {
            slicedItems.unshift(selectedItem);
          }
        }
      });
    }

    return slicedItems;
  });

  // Check if there are more items
  const hasMore = computed(() => {
    return validItems.value.length > displayedCount.value;
  });

  // Load more items with debounce
  const loadMore = useDebounceFn(() => {
    if (hasMore.value) {
      displayedCount.value = Math.min(
        displayedCount.value + batchSize,
        validItems.value.length
      );
    }
  }, 200);

  // Reset to initial batch size
  const reset = () => {
    displayedCount.value = batchSize;
  };

  // Scroll handler
  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    // Load more when near bottom (80% scrolled)
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      loadMore();
    }
  };

  // Setup scroll listener
  const setupScrollListener = () => {
    if (!isActive.value) return () => { };

    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  };

  // Cleanup/destroy
  const destroy = () => {
    isActive.value = false;
  };

  // Watch items and reset on change (with guard)
  watch(
    items,
    (newVal) => {
      if (newVal && isActive.value) {
        reset();
      }
    },
    { flush: 'post' }
  );

  return {
    displayedItems,
    displayedCount,
    hasMore,
    loadMore,
    reset,
    setupScrollListener,
    destroy,
    searchQuery,
  };
};

