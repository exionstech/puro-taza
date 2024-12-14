"use client"
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchItemProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchItem = ({ 
  placeholder = "Search 'Fishes'",
  onSearch = () => {} 
}: SearchItemProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
      <div className="relative w-full bg-[#F6F6F6] rounded-xl">
        <Search className="absolute left-2 top-2.5 size-5 text-[#CBCBCB]" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          className="pl-8 pr-8 text-neutral-500 bg-[#F6F6F6]"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 p-0"
            onClick={handleClear}
          >
            <X className="size-4 text-[#CBCBCB]" />
          </Button>
        )}
      </div>
  );
};

export default SearchItem;